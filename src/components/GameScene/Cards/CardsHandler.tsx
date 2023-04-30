import { assetsTask } from "../../assetsTask";
import { FC, useEffect, useState } from "react";
import { MeshAssetTask } from "@babylonjs/core/Misc/assetsManager";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { useAssetManager } from "react-babylonjs";
import Card from "./Card";
import { observer } from "mobx-react-lite";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  DEALER_SPOT_POSITION,
  PLAYER_SPOTS_POSITIONS,
  PLAYER_SPOTS_ROTATION,
  ROTATED_CARD_VECTOR,
} from "../../../utils/consts";
import { RoomState } from "../../../types/types";
import { useMainStore } from "../../../hooks/useMainStore";

// receiving arrays with player/dealer cards and displaying them
export const CardsHandler: FC = observer(() => {
  const assetManagerResult = useAssetManager(assetsTask);
  const [cardMesh, setCardMesh] = useState<Mesh | null>(null);

  const { dealerHand, roomState } = useMainStore().roomStore;
  const { playerSpots } = useMainStore().playerSpotsStore;

  useEffect(() => {
    const cardTask = assetManagerResult.taskNameMap["card"] as MeshAssetTask;
    setCardMesh(() => cardTask.loadedMeshes[0] as Mesh);
  }, [assetManagerResult.taskNameMap]);

  return cardMesh ? (
    <>
      {playerSpots.map((playerSpot) =>
        playerSpot.hand.map((handCard, index) => (
          <Card
            key={handCard.rank + handCard.suit + playerSpot.index}
            card={cardMesh}
            value={handCard.value}
            suit={handCard.suit}
            rank={handCard.rank}
            offset={index / 30}
            position={PLAYER_SPOTS_POSITIONS[playerSpot.index]}
            rotation={PLAYER_SPOTS_ROTATION[playerSpot.index]}
          />
        ))
      )}

      {/*dealer cards*/}
      {dealerHand.map((card, i) => (
        <Card
          key={card.rank + card.suit + Math.random()}
          card={cardMesh}
          value={card.value}
          suit={card.suit}
          rank={card.rank}
          offset={i / 30}
          position={DEALER_SPOT_POSITION}
          rotation={
            dealerHand.length === 2 &&
            roomState === RoomState.playing &&
            i === 1
              ? ROTATED_CARD_VECTOR
              : Vector3.Zero()
          }
        />
      ))}
    </>
  ) : null;
});
