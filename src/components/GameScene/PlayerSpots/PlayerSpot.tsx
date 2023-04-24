import { FC, useEffect, useRef, useState } from "react";
import { useClick } from "react-babylonjs";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import {
  IPlayerSpotProps,
  PlayerSpotStatus,
  RoomState,
} from "../../../types/types";
import CardsTooltip from "../BabylonUI/CardsTooltip";
import HitNStandButtons from "../BabylonUI/HitNStandButtons/HitNStandButtons";
import { usePlayerSpotCamera } from "../../../hooks/usePlayerSpotCamera";
import PlayerSpotChip from "./PlayerSpotChip";
import PlayerSpotMaterial from "./PlayerSpotMaterial";
import { playerSpotDiameter, playerSpotHeight } from "../../../utils/consts";

const PlayerSpot: FC<IPlayerSpotProps> = observer(
  ({ points, position, rotation, status, index }) => {
    const [playerSpotChips, setPlayerSpotChip] = useState<number[]>([]);
    const roomState = mainStore.roomStore.roomState;
    const playerSpotRef = useRef(null);

    useClick(() => {
      const selectedBet = mainStore.userStore.user.selectedChip;
      if (selectedBet > 0) {
        //setting totalBet (displayed on bottom)
        mainStore.userStore.addToTotalBet(selectedBet);

        //placing bet for this playerSpot
        mainStore.playerSpotsStore.placeBet(index, selectedBet);

        //need it to render chips on playerSpot
        setPlayerSpotChip(() => [...playerSpotChips, selectedBet]);
      }
    }, playerSpotRef);

    //clear chips array at the end
    useEffect(() => {
      if (roomState === RoomState.ending) {
        setPlayerSpotChip(() => []);
      }
    }, [roomState]);

    //changing camera angle if playerSpot is active
    usePlayerSpotCamera(status, rotation._y);

    return (
      <>
        <glowLayer name="glow-layer" intensity={0.4} blurKernelSize={20} />

        <cylinder
          ref={playerSpotRef}
          name={`playerSpot${index}`}
          height={playerSpotHeight}
          diameter={playerSpotDiameter}
          position={position}
          isVisible={roomState === RoomState.betting}
        >
          <CardsTooltip points={points} />

          <PlayerSpotMaterial playerSpotChipsLength={playerSpotChips.length} />
        </cylinder>

        {/*putting chips on spot */}
        {playerSpotChips.map((chip, i) => (
          <PlayerSpotChip
            key={chip + i + Date.now()}
            position={position}
            chip={chip}
          />
        ))}
        {/*rendering buttons for active spot */}
        {status === PlayerSpotStatus.active && (
          <HitNStandButtons index={index} />
        )}
      </>
    );
  }
);

export default PlayerSpot;
