import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import CardsTooltip from "../BabylonUI/CardsTooltip";
import { dealerSpotPosition } from "../../../utils/consts";
import { observer } from "mobx-react-lite";

// displaying dealer tooltip
const DealerSpot: FC = observer(() => {
  const dealerPoints = mainStore.roomStore.dealerPoints;

  return (
    <transformNode name="dealer-spot" position={dealerSpotPosition}>
      <CardsTooltip points={dealerPoints} />
    </transformNode>
  );
});
export default DealerSpot;
