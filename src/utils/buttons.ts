import { mainStore } from "../stores/MainStore";
import { PlayerSpotStatus } from "../types/types";

export const deactivatePlayerSpot = (index: number) => {
  mainStore.playerSpotsStore.setPlayerSpotStatus(
    index,
    PlayerSpotStatus.inactive
  );
};

export const recalculatePoints = (index: number, recalcForDealer: boolean) => {
  mainStore.playerSpotsStore.recalculatePoints(index);
  if (recalcForDealer) {
    mainStore.roomStore.recalculateDealerPoints();
  }
};
