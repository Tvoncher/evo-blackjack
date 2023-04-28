import { MainStore } from "../MainStore";
import { ICard, endgameStatus } from "../../types/types";
import { PlayerSpotStatus } from "../../types/types";

const dummyCards: ICard[] = [
  {
    suit: "hearts",
    rank: "A",
    value: 11,
  },
  {
    suit: "diamonds",
    rank: 10,
    value: 10,
  },
  {
    suit: "clubs",
    rank: "A",
    value: 11,
  },
  {
    suit: "clubs",
    rank: 3,
    value: 3,
  },
];

describe("playerSpot store", () => {
  const mainStore = new MainStore();
  const playerSpotsStore = mainStore.playerSpotsStore;
  const roomStore = mainStore.roomStore;

  beforeEach(() => {
    playerSpotsStore.playerSpots[0].roundProfit = 0;
  });

  it("should initiate player spots", () => {
    expect(playerSpotsStore.playerSpots).toHaveLength(5);
    playerSpotsStore.playerSpots.forEach((playerSpot) => {
      expect(playerSpot.hand).toHaveLength(0);
      expect(playerSpot.bet).toBe(0);
      expect(playerSpot.points).toBe(0);
      expect(playerSpot.previousBet).toBe(0);
      expect(playerSpot.roundProfit).toBe(0);
      expect(playerSpot.endgameStatus).toEqual(endgameStatus.lose);
      expect(playerSpot.status).toEqual(PlayerSpotStatus.inactive);
    });
    expect(playerSpotsStore.activePlayerSpotIndex).toBeUndefined();
  });

  it("should set playerSpot statuses", () => {
    playerSpotsStore.setPlayerSpotStatus(0, PlayerSpotStatus.active);
    expect(playerSpotsStore.playerSpots[0].status).toBe(
      PlayerSpotStatus.active
    );
    playerSpotsStore.setPlayerSpotStatus(0, PlayerSpotStatus.inactive);
    expect(playerSpotsStore.playerSpots[0].status).toBe(
      PlayerSpotStatus.inactive
    );
  });

  it("should place bets for playerSpot ", () => {
    playerSpotsStore.placeBet(0, 200);
    expect(playerSpotsStore.playerSpots[0].bet).toBe(200);
    playerSpotsStore.placeBet(0, 25);
    expect(playerSpotsStore.playerSpots[0].bet).toBe(225);
  });

  it("should reset existing bet and set as previous ", () => {
    playerSpotsStore.playerSpots[0].bet = 100;
    playerSpotsStore.resetBet(0);
    expect(playerSpotsStore.playerSpots[0].bet).toBe(0);
    expect(playerSpotsStore.playerSpots[0].previousBet).toBe(100);
  });

  it("should set index for active playerSpot ", () => {
    playerSpotsStore.setActivePlayerSpotIndex(0);
    expect(playerSpotsStore.activePlayerSpotIndex).toBe(0);
    playerSpotsStore.setActivePlayerSpotIndex(3);
    expect(playerSpotsStore.activePlayerSpotIndex).toBe(3);
  });

  it("should clear store data", () => {
    playerSpotsStore.clear();
    playerSpotsStore.playerSpots.forEach((playerSpot) => {
      expect(playerSpot.bet).toBe(0);
      expect(playerSpot.hand).toHaveLength(0);
      expect(playerSpot.points).toBe(0);
      expect(playerSpot.roundProfit).toBe(0);
      expect(playerSpot.endgameStatus).toBe(endgameStatus.lose);
    });
    expect(playerSpotsStore.activePlayerSpotIndex).toBeUndefined();
  });

  it("should set players endgame statuses according to their and dealer points ", () => {
    roomStore.dealerPoints = 15;

    playerSpotsStore.playerSpots[0].points = 21;
    playerSpotsStore.playerSpots[1].points = 15;
    playerSpotsStore.playerSpots[2].points = 10;
    playerSpotsStore.playerSpots[3].points = 22;
    playerSpotsStore.setEndgameStatuses(mainStore.roomStore.dealerPoints);
    expect(playerSpotsStore.playerSpots[0].endgameStatus).toBe(
      endgameStatus.win
    );
    expect(playerSpotsStore.playerSpots[1].endgameStatus).toBe(
      endgameStatus.tie
    );
    expect(playerSpotsStore.playerSpots[2].endgameStatus).toBe(
      endgameStatus.lose
    );
    expect(playerSpotsStore.playerSpots[3].endgameStatus).toBe(
      endgameStatus.lose
    );
  });

  it("should calculate player points ", () => {
    //ace + 10 must be 21
    playerSpotsStore.playerSpots[0].hand = [dummyCards[0], dummyCards[1]];
    playerSpotsStore.recalculatePoints(0);
    expect(playerSpotsStore.playerSpots[0].points).toBe(21);

    //testing two aces. should not bust
    playerSpotsStore.playerSpots[0].hand = [dummyCards[0], dummyCards[2]];
    playerSpotsStore.recalculatePoints(0);
    expect(playerSpotsStore.playerSpots[0].points).toBeLessThan(21);

    //testing two aces and 10. should not bust
    playerSpotsStore.playerSpots[0].hand = [
      dummyCards[0],
      dummyCards[1],
      dummyCards[2],
    ];
    playerSpotsStore.recalculatePoints(0);
    expect(playerSpotsStore.playerSpots[0].points).toBeLessThan(21);

    //10 + 3
    playerSpotsStore.playerSpots[0].hand = [dummyCards[1], dummyCards[3]];
    playerSpotsStore.recalculatePoints(0);
    expect(playerSpotsStore.playerSpots[0].points).toBe(13);
  });

  it("should calculate profit at the end of the round in case of win", () => {
    playerSpotsStore.playerSpots[0].previousBet = 100;
    playerSpotsStore.playerSpots[0].endgameStatus = endgameStatus.win;
    playerSpotsStore.calculateRoundProfits();
    expect(playerSpotsStore.playerSpots[0].roundProfit).toBe(200);
  });

  it("should calculate profit at the end of the round in case of lose", () => {
    playerSpotsStore.playerSpots[0].previousBet = 100;
    playerSpotsStore.playerSpots[0].endgameStatus = endgameStatus.lose;
    playerSpotsStore.calculateRoundProfits();
    expect(playerSpotsStore.playerSpots[0].roundProfit).toBe(-100);
  });

  it("should calculate profit at the end of the round in case of tie", () => {
    playerSpotsStore.playerSpots[0].previousBet = 100;
    playerSpotsStore.playerSpots[0].endgameStatus = endgameStatus.tie;
    playerSpotsStore.calculateRoundProfits();
    expect(playerSpotsStore.playerSpots[0].roundProfit).toBe(100);
  });
});
