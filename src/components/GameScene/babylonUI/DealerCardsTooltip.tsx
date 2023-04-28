import { FC } from "react";
import { Html } from "react-babylonjs";
import { observer } from "mobx-react-lite";
import { useMainStore } from "../../../hooks/useMainStore";

// small tooltip displaying dealer points
const DealerCardsTooltip: FC = observer(() => {
  const { dealerPoints, dealerHand } = useMainStore().roomStore;

  return (
    <>
      {dealerHand.length > 0 && (
        <Html name="html" disposeInstanceOnUnmount>
          {
            <div
              style={{
                background: "var(--font-golden-color)",
                borderRadius: "20px",
                border: "1px solid black",
                padding: "2.3px",
                opacity: "0.7",
                fontWeight: "900",
                position: "absolute",
                top: "35px",
                right: "25px",
              }}
            >
              {dealerHand.length === 2 ? dealerHand[0].value : dealerPoints}
            </div>
          }
        </Html>
      )}
    </>
  );
});

export default DealerCardsTooltip;
