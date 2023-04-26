import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import { RoomState, roundWinningStatus } from "../../../types/types";
import { Html } from "react-babylonjs";

interface ICardsTooltip {
  points: number;
  roundWinningStatus: roundWinningStatus;
}

// small tooltip displaying points / win / lose
const CardsTooltip: FC<ICardsTooltip> = ({ points, roundWinningStatus }) => {
  const roomState = mainStore.roomStore.roomState;

  return (
    <>
      {roomState !== RoomState.ending && points > 0 && (
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
              {points <= 21 ? points : "busted"}
            </div>
          }
        </Html>
      )}

      {roomState === RoomState.ending && points > 0 && (
        <Html name="html" occlude={false}>
          {
            <div
              style={{
                background: "var(--font-golden-color)",
                borderRadius: "20px",
                border: "1px solid black",
                padding: "7px",
                opacity: "0.7",
                fontWeight: "900",
                position: "absolute",
                top: "70px",
                right: "50px",
              }}
            >
              {roundWinningStatus}
            </div>
          }
        </Html>
      )}
    </>
  );
};

export default CardsTooltip;
