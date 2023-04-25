import { mainStore } from "../stores/MainStore";
import { IPlayerSpot, PlayerSpotStatus, RoomState } from "../types/types";
import { deactivatePlayerSpot } from "./buttons";

export const findActiveSpot = (): void => {
  //finding first playerSpot with bets
  const spotWithBets: IPlayerSpot | undefined =
    mainStore.playerSpotsStore.playerSpots.find(
      (playerSpot) => playerSpot.bet > 0
    );
  if (spotWithBets) {
    //setting state to active,so we can play now
    mainStore.playerSpotsStore.setPlayerSpotStatus(
      spotWithBets.index,
      PlayerSpotStatus.active
    );

    //need this for easier access in future
    mainStore.playerSpotsStore.setActivePlayerSpotIndex(spotWithBets.index);

    //reseting bet and saving as previous
    mainStore.playerSpotsStore.resetBet(spotWithBets.index);
  }
  //if zero spots left -> end game
  else {
    mainStore.roomStore.runDealerLogic();
    mainStore.playerSpotsStore.calculateRoundResults();
    mainStore.roomStore.setRoomState(RoomState.ending);
  }
};

export const checkPoints = () => {
  const activeSpotIndex = mainStore.playerSpotsStore.activePlayerSpotIndex;
  if (typeof activeSpotIndex === "number") {
    const points =
      mainStore.playerSpotsStore.playerSpots[activeSpotIndex].points;

    if (points >= 21) {
      deactivatePlayerSpot();
      findActiveSpot();
    }
  }
};

export const clearStoresData = () => {
  mainStore.playerSpotsStore.clear();
  mainStore.roomStore.clear();
  mainStore.userStore.clear();
};
