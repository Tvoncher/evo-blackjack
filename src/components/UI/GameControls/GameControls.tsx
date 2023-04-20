import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FC, useCallback, useContext, useEffect } from "react";
import { MainStoreContext, mainStore } from "../../../stores/MainStore";
import Chips from "../../GameScene/Chips/Chips";
import { RoomState } from "../../../types/types";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { recalculatePoints } from "../../../utils/utils";

//TODO: rewrite,delete,export somewhere else etc
const GameControls: FC = observer(() => {
  const context = useContext(MainStoreContext);

  const playerSpots = mainStore.playerSpotsStore.playerSpots;
  const roomStore = mainStore.roomStore;

  const roomState = mainStore.roomStore.roomState;
  //TODO: context null

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
          //when state === playing => set active player spots
          //work only with active once
          //like playeSpot[0] === active
          //if clicked on stand - set inactive,move to next player spot,until noone left
        });
      }, 700);
      //TODO: rewrite later
    }
  }, []);

  return (
    <>
      {roomState === RoomState.betting && <Chips />}
      <adtFullscreenUi name="ui">
        {roomState === RoomState.betting && (
          <babylon-ellipse
            top="100px"
            name="deal-button"
            height="80px"
            width="80px"
            background="DarkGreen"
            onPointerDownObservable={handleDeal}
          >
            <textBlock
              text={"DEAL"}
              fontFamily="FontAwesome"
              fontStyle="bold"
              fontSize={20}
              color="white"
            />
          </babylon-ellipse>
        )}
      </adtFullscreenUi>
    </>
  );
});

export default GameControls;
