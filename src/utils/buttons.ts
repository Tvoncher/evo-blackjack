import { mainStore } from "../stores/MainStore";
import { PlayerSpotStatus } from "../types/types";

export const deactivatePlayerSpot = () => {
  const index = mainStore.playerSpotsStore.activePlayerSpotIndex;
  if (typeof index === "number") {
    mainStore.playerSpotsStore.setPlayerSpotStatus(
      index,
      PlayerSpotStatus.inactive
    );
  }
};

export const recalculatePoints = (recalcForDealer: boolean) => {
  const index = mainStore.playerSpotsStore.activePlayerSpotIndex;
  if (typeof index === "number") {
    mainStore.playerSpotsStore.recalculatePoints(index);
  }
  if (recalcForDealer) {
    mainStore.roomStore.recalculateDealerPoints();
  }
};

export const dealCards = (target: "player" | "dealer", numOfCards: number) => {
  //targetPlayerSpot represents targeted hand - playerSpot or dealer
  if (target === "player") {
    const index = mainStore.playerSpotsStore.activePlayerSpotIndex;
    if (typeof index === "number") {
      mainStore.playerSpotsStore.setPlayerSpotHand(numOfCards, index);
    }
  } else mainStore.roomStore.setDealerHand(numOfCards);
};
