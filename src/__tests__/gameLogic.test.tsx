import { MainStore } from "../stores/MainStore";
import { endgameStatus } from "../types/types";
import { STARTING_BALANCE } from "../utils/consts";
import { placeBetOnPlayerSpot } from "../utils/playerSpot";
import { dummyCards } from "../utils/utils";

const firstBet = 100;
const secondBet = 50;

describe("main logic flow", () => {
  const mainStore = new MainStore();
  const roomStore = mainStore.roomStore;
  const playerSpotsStore = mainStore.playerSpotsStore;

  describe("winning conditions", () => {
    it("should set endgame statuses", () => {
      //setting bets
      placeBetOnPlayerSpot(mainStore, 0, firstBet);
      placeBetOnPlayerSpot(mainStore, 1, secondBet);

      //dealing cards. 21 point
      playerSpotsStore.playerSpots[0].hand = [dummyCards[0], dummyCards[1]];
      //14
      playerSpotsStore.playerSpots[1].hand = [dummyCards[2], dummyCards[3]];
      //11 for dealer
      roomStore.deck = [dummyCards[4], dummyCards[5]];
      roomStore.setDealerHand(2);
      playerSpotsStore.recalculatePoints(0);
      playerSpotsStore.recalculatePoints(1);
      roomStore.recalculateDealerPoints();

      //dealer has less points than both spots => checking winners
      playerSpotsStore.setEndgameStatuses(mainStore.roomStore.dealerPoints);
      expect(playerSpotsStore.playerSpots[0].endgameStatus).toBe(
        endgameStatus.win
      );
      expect(playerSpotsStore.playerSpots[1].endgameStatus).toBe(
        endgameStatus.win
      );
    });

    it("should calculate previous bets", () => {
      //reseting bets to save as previous for rebet action (not done yet,coming in future)
      playerSpotsStore.resetBet(0);
      playerSpotsStore.resetBet(1);

      expect(playerSpotsStore.playerSpots[0].previousBet).toBe(firstBet);
      expect(playerSpotsStore.playerSpots[1].previousBet).toBe(secondBet);
    });

    it("should calculate round profits", () => {
      mainStore.playerSpotsStore.calculateRoundProfits();
      expect(playerSpotsStore.playerSpots[0].roundProfit).toBe(firstBet * 2);
      expect(playerSpotsStore.playerSpots[1].roundProfit).toBe(secondBet * 2);
    });

    it("should calculate totalWin", () => {
      playerSpotsStore.calculateTotalWin(mainStore);
      expect(mainStore.userStore.totalWin).toBe(firstBet * 2 + secondBet * 2);
    });

    it("should set balance", () => {
      mainStore.userStore.addToBalance(mainStore.userStore.totalWin);
      expect(mainStore.userStore.user.balance).toBe(
        STARTING_BALANCE + firstBet * 2 + secondBet * 2
      );

      //clearing everything before next tests
      roomStore.clear();
      playerSpotsStore.clear();
      mainStore.userStore.user.balance = STARTING_BALANCE;
    });
  });

  describe("losing conditions", () => {
    it("should set endgame statuses", () => {
      //setting bets
      placeBetOnPlayerSpot(mainStore, 0, firstBet);
      placeBetOnPlayerSpot(mainStore, 1, secondBet);

      //dealing cards. 11 points
      playerSpotsStore.playerSpots[0].hand = [dummyCards[4], dummyCards[5]];
      //14
      playerSpotsStore.playerSpots[1].hand = [dummyCards[2], dummyCards[3]];
      //21 for dealer
      roomStore.deck = [dummyCards[0], dummyCards[1]];
      roomStore.setDealerHand(2);
      playerSpotsStore.recalculatePoints(0);
      playerSpotsStore.recalculatePoints(1);
      roomStore.recalculateDealerPoints();

      //dealer has more points than both spots => checking losers
      playerSpotsStore.setEndgameStatuses(mainStore.roomStore.dealerPoints);
      expect(playerSpotsStore.playerSpots[0].endgameStatus).toBe(
        endgameStatus.lose
      );
      expect(playerSpotsStore.playerSpots[1].endgameStatus).toBe(
        endgameStatus.lose
      );
    });

    it("should calculate previous bets", () => {
      //reseting bets to save as previous for rebet action (not done yet,coming in future)
      playerSpotsStore.resetBet(0);
      playerSpotsStore.resetBet(1);

      expect(playerSpotsStore.playerSpots[0].previousBet).toBe(firstBet);
      expect(playerSpotsStore.playerSpots[1].previousBet).toBe(secondBet);
    });

    it("should calculate round profits", () => {
      mainStore.playerSpotsStore.calculateRoundProfits();
      expect(playerSpotsStore.playerSpots[0].roundProfit).toBe(-firstBet);
      expect(playerSpotsStore.playerSpots[1].roundProfit).toBe(-secondBet);
    });

    it("should calculate totalWin", () => {
      playerSpotsStore.calculateTotalWin(mainStore);
      expect(mainStore.userStore.totalWin).toBe(-firstBet - secondBet);
    });

    it("should set balance", () => {
      mainStore.userStore.addToBalance(mainStore.userStore.totalWin);
      expect(mainStore.userStore.user.balance).toBe(
        STARTING_BALANCE - firstBet - secondBet
      );
    });
  });
});
