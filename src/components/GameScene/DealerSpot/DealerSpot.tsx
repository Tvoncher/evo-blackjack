import { FC } from "react";
import { DEALER_SPOT_POSITION } from "../../../utils/consts";
import DealerCardsTooltip from "../BabylonUI/DealerCardsTooltip";

// displaying dealer tooltip
const DealerSpot: FC = () => {
  return (
    <transformNode name="dealer__spot" position={DEALER_SPOT_POSITION}>
      <DealerCardsTooltip />
    </transformNode>
  );
};
export default DealerSpot;
