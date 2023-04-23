import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import CardsTooltip from "../babylonUI/CardsTooltip";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { RoomState } from "../../../types/types";
import Card from "../Cards/Card";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

interface IDealerSpot {
  cardMesh: Mesh;
  points: number;
}

// small tooltip displaying points / win / lose
const DealerSpot: FC<IDealerSpot> = ({ cardMesh, points }) => {
  const roomState = mainStore.roomStore.roomState;
  const dealerPoints = mainStore.roomStore.dealerPoints;
  const dealerCards = mainStore.roomStore.dealerCards;

  return (
    <>
      <transformNode name="dealer-spot" position={new Vector3(0, 3.1, 2.7)}>
        {mainStore.roomStore.roomState === RoomState.playing &&
          dealerCards.map((card, i) => (
            <Card
              key={card.rank + card.suit + i}
              card={cardMesh}
              value={card.value}
              suit={card.suit}
              rank={card.rank}
              offset={i / 10}
              position={new Vector3(0, 0, 0)}
              rotation={
                dealerCards.length === 2 && i === 1
                  ? new Vector3(0, 0, Math.PI)
                  : Vector3.Zero()
              }
            />
          ))}
        <CardsTooltip points={mainStore.roomStore.dealerPoints} />
      </transformNode>
    </>
  );
};

export default DealerSpot;
