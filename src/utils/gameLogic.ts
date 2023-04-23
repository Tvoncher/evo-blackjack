import { toJS } from "mobx";
import { mainStore } from "../stores/MainStore";
import { IPlayerSpot, PlayerSpotStatus, RoomState } from "../types/types";

//single file for handling main logic flow

export const findActiveSpot = (): void => {
  const activePlayerSpot: IPlayerSpot | undefined =
    mainStore.playerSpotsStore.playerSpots.find(
      (playerSpot) => playerSpot.bet > 0
    );
  if (activePlayerSpot) {
    //setting state to active,so we can play now
    mainStore.playerSpotsStore.setPlayerSpotStatus(
      activePlayerSpot.index,
      PlayerSpotStatus.active
    );

    mainStore.playerSpotsStore.resetBet(activePlayerSpot.index);
  } else mainStore.roomStore.setRoomState(RoomState.ending);
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
