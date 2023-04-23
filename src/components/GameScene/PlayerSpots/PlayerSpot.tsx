import { FC, useCallback, useEffect, useRef, useState } from "react";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3, Texture, ArcRotateCamera } from "@babylonjs/core";
import { useClick, useScene } from "react-babylonjs";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import { PlayerSpotStatus, RoomState } from "../../../types/types";
import { checkPoints, findActiveSpot } from "../../../utils/gameLogic";
import { recalculatePoints } from "../../../utils/utils";
import CardsTooltip from "../babylonUI/CardsTooltip";
import Buttons from "./Buttons";

interface IPlayerSpotProps {
  points: number;
  position: Vector3;
  rotation: Vector3;
  index: number;
  status: PlayerSpotStatus;
}

const PlayerSpot: FC<IPlayerSpotProps> = observer(
  ({ points, position, rotation, status, index }) => {
    const [chips, setChips] = useState<number[]>([]);

    const roomState = mainStore.roomStore.roomState;
    const roomStore = mainStore.roomStore;

    const playerSpotTexture: Texture = new Texture(
      "textures/playerSpot/playerSpot.png"
    );
    playerSpotTexture.hasAlpha = true; // need it to use as alpha

    const playerSpotRef = useRef(null);

    useClick(() => {
      const selectedBet = mainStore.userStore.user.selectedChip;
      if (selectedBet !== 0) {
        //setting totalBet (displayed on bottom)
        mainStore.userStore.addToTotalBet(selectedBet);

        //placing bet for this playerSpot
        mainStore.playerSpotsStore.placeBet(index, selectedBet);

        //need it to render chips on playerSpot
        setChips((chips) => [...chips, selectedBet]);
      }
    }, playerSpotRef);

    useEffect(() => {
      if (roomState === RoomState.ending) {
        setChips(() => []);
      }
    }, [roomState]);

    const bumpTexture: Texture = new Texture("textures/bumpTexture.png");

    //changing camera angle if playerSpot is active
    const scene = useScene();
    if (status === PlayerSpotStatus.active && scene) {
      const camera = scene.cameras[0] as ArcRotateCamera;

      camera.alpha = Math.PI / 2 + Math.sin(rotation._y / 2);
      camera.radius = 6;
    }

    return (
      <>
        <glowLayer name="glow-layer" intensity={0.4} blurKernelSize={20} />

        <cylinder
          ref={playerSpotRef}
          name={`playerSpot${index}`}
          height={0.01}
          diameter={0.3}
          position={position}
          isVisible={roomState === RoomState.betting}
        >
          <CardsTooltip points={points} />

          <standardMaterial
            name="playerSpot-material"
            diffuseTexture={playerSpotTexture}
            alpha={0.4}
            useAlphaFromDiffuseTexture
            emissiveColor={
              chips.length > 0
                ? new Color3(0.2, 0.2, 0.2)
                : new Color3(0.9, 0.9, 0.9)
            }
          />
        </cylinder>

        {/*putting chips on spot */}
        {/*TODO: use Chip as component*/}
        {chips.map((chip, i) => (
          <cylinder
            key={chip + i + Date.now()}
            name={`chip${i}`}
            height={0.04}
            diameter={0.2}
            position={position}
            isVisible={roomState === RoomState.betting}
            disposeInstanceOnUnmount
          >
            <standardMaterial
              name="chip-material"
              diffuseTexture={new Texture(`textures/chip${chip}.png`)}
              bumpTexture={bumpTexture}
            />
          </cylinder>
        ))}

        <Buttons points={points} index={index} status={status} />
      </>
    );
  }
);

export default PlayerSpot;
