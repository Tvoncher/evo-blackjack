import { FC, useCallback } from "react";
import { mainStore } from "../../../stores/MainStore";
import { RoomState } from "../../../types/types";
import { observer } from "mobx-react-lite";
import { Html } from "react-babylonjs";

const DealButton: FC = observer(() => {
  const playerSpots = mainStore.playerSpotsStore.playerSpots;
  const roomStore = mainStore.roomStore;

  // dealing cards to each spot with bets and dealer
  const handleDeal = useCallback(() => {
    if (mainStore.userStore.user.totalBet > 0) {
      mainStore.roomStore.setRoomState(RoomState.dealing);
      //waiting for dealer animation
      setTimeout(() => {
        playerSpots.forEach((playerSpot) => {
          if (playerSpot.bet > 0) {
            mainStore.playerSpotsStore.setPlayerSpotHand(2, playerSpot.index);
            mainStore.playerSpotsStore.recalculatePoints(playerSpot.index);
          }
        });
        roomStore.setDealerHand(2);
        roomStore.recalculateDealerPoints();

        roomStore.setRoomState(RoomState.playing);
      }, 700);
    }
  }, []);

  return (
    <Html name="buttons" center>
      <div className="ui">
        <div className="button__container" onClick={handleDeal}>
          <div className="button deal">
            <p className="text">DEAL</p>
          </div>
        </div>
      </div>
    </Html>
  );
});
export default DealButton;
