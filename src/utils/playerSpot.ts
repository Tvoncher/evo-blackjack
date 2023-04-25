import { mainStore } from "../stores/MainStore";

export const placeBetOnPlayerSpot = (index: number, selectedBet: number) => {
  //setting totalBet (displayed on bottom)
  mainStore.userStore.addToTotalBet(selectedBet);
  //placing bet for this playerSpot
  mainStore.playerSpotsStore.placeBet(index, selectedBet);
};
