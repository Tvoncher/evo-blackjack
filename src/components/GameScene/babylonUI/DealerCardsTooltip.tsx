import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import { Html } from "react-babylonjs";
import { observer } from "mobx-react-lite";

// small tooltip displaying points / win / lose
const DealerCardsTooltip: FC = observer(() => {
  const dealerPoints = mainStore.roomStore.dealerPoints;

  return (
    <>
      {dealerPoints > 0 && (
        <Html name="html">
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
              {dealerPoints}
            </div>
          }
        </Html>
      )}
    </>
  );
});

export default DealerCardsTooltip;
