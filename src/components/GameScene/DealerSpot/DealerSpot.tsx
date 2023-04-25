import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import CardsTooltip from "../BabylonUI/CardsTooltip";
import { DEALER_SPOT_POSITION } from "../../../utils/consts";
import { observer } from "mobx-react-lite";

// displaying dealer tooltip
const DealerSpot: FC = observer(() => {
  const dealerPoints = mainStore.roomStore.dealerPoints;

  return (
    <transformNode name="dealer-spot" position={DEALER_SPOT_POSITION}>
      <CardsTooltip points={dealerPoints} />
    </transformNode>
  );
});
export default DealerSpot;
