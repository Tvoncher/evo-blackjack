import { FC } from "react";
import { mainStore } from "../../stores/MainStore";
import CardsTooltip from "./CardsTooltip";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

interface IDealerSpot {
  points: number;
}

// small tooltip displaying points / win / lose
const DealerSpot: FC<IDealerSpot> = ({ points }) => {
  const roomState = mainStore.roomStore.roomState;
  const dealerPoints = mainStore.roomStore.dealerPoints;
  return (
    <>
      <transformNode name="dealer-spot" position={new Vector3(0, 3.1, 2.7)}>
        <CardsTooltip points={mainStore.roomStore.dealerPoints} />
      </transformNode>
    </>
  );
};

export default DealerSpot;
