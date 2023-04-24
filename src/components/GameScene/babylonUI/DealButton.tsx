import { FC, useCallback } from "react";
import { mainStore } from "../../../stores/MainStore";
import { RoomState } from "../../../types/types";
import { observer } from "mobx-react-lite";
import { recalculatePoints } from "../../../utils/utils";
import { Html } from "react-babylonjs";

const DealButton: FC = observer(() => {
  const playerSpots = mainStore.playerSpotsStore.playerSpots;
  const roomStore = mainStore.roomStore;
  const totalBet = mainStore.userStore.user.totalBet;

  const roomState = mainStore.roomStore.roomState;

  const handleDeal = useCallback(() => {
    if (mainStore.userStore.user.totalBet > 0) {
      mainStore.roomStore.setRoomState(RoomState.dealing);
      //waiting for dealer animation
      setTimeout(() => {
        mainStore.roomStore.dealerCards = roomStore.takeCards(2);

        playerSpots.forEach((playerSpot, i) => {
          if (playerSpot.bet > 0) {
            playerSpot.hand = roomStore.takeCards(2);
            recalculatePoints(i, true);
          }

          mainStore.roomStore.setRoomState(RoomState.playing);
        });
      }, 700);
    }
  }, []);

  return (
    <>
      {roomState === RoomState.betting && totalBet > 0 && (
        <Html name="buttons" center>
          <div className="ui-container">
            <div className="button-container" onClick={handleDeal}>
              <div className="button deal">
                <p className="text">DEAL</p>
              </div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
});

export default DealButton;
