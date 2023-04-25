import { mainStore } from "../stores/MainStore";
import { IPlayerSpot, PlayerSpotStatus, RoomState } from "../types/types";

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

    //reseting bet and saving as previous
    mainStore.playerSpotsStore.resetBet(spotWithBets.index);
  }
  //if zero spots left -> end game
  else {
    mainStore.playerSpotsStore.calculateRoundResults();
    mainStore.roomStore.setRoomState(RoomState.ending);
  }
};

export const clearEverything = () => {
  mainStore.playerSpotsStore.clear();
  mainStore.roomStore.clear();
  mainStore.userStore.clear();
};

export const checkPoints = (index: number) => {
  const points = mainStore.playerSpotsStore.playerSpots[index].points;

  if (points > 21) {
    mainStore.playerSpotsStore.setPlayerSpotStatus(
      index,
      PlayerSpotStatus.inactive
    );

    findActiveSpot();
  }
};
