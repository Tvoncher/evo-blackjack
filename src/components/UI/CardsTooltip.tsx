import { FC } from "react";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { mainStore } from "../../stores/MainStore";
import { RoomState } from "../../types/types";
import { Html } from "react-babylonjs";

interface ICardsTooltip {
  points: number;
}

// small tooltip displaying points / win / lose
const CardsTooltip: FC<ICardsTooltip> = ({ points }) => {
  const roomState = mainStore.roomStore.roomState;
  const dealerPoints = mainStore.roomStore.dealerPoints;
  return (
    <>
      {roomState === RoomState.playing && points > 0 && (
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
              {points > dealerPoints && points <= 21 ? "win" : "lose"}
            </div>
          }
        </Html>
      )}
    </>
  );
};

export default CardsTooltip;
