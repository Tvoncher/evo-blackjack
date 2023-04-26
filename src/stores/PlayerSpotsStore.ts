import { action, makeObservable, observable } from "mobx";
import { IPlayerSpot, PlayerSpotStatus } from "../types/types";
import { mainStore } from "./MainStore";

//handling all playerSpots data
export class PlayerSpotsStore {
  @observable
  public playerSpots: IPlayerSpot[] = [
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 0,
      points: 0,
      previousBet: 0,
      roundResult: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 1,
      points: 0,
      previousBet: 0,
      roundResult: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,

      index: 2,
      points: 0,
      previousBet: 0,
      roundResult: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 3,
      points: 0,
      previousBet: 0,
      roundResult: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 4,
      points: 0,
      previousBet: 0,
      roundResult: 0,
    },
  ];

  @observable
  activePlayerSpotIndex: number | undefined = undefined;

  public constructor() {
    makeObservable(this);
  }

  @action
  setActivePlayerSpotIndex(index: number) {
    this.activePlayerSpotIndex = index;
  }

  @action
  setPlayerSpotStatus(index: number, status: PlayerSpotStatus) {
    this.playerSpots[index].status = status;
  }

  @action
  placeBet(index: number, bet: number) {
    this.playerSpots[index].bet += bet;
  }

  @action
  resetBet(index: number) {
    this.playerSpots[index].previousBet = this.playerSpots[index].bet;
    this.playerSpots[index].bet = 0;
  }

  @action
  recalculatePoints(index: number) {
    let newPoints: number = 0;
    this.playerSpots[index].hand.forEach((card) => (newPoints += card.value));
    this.playerSpots[index].points = newPoints;
  }

  @action
  calculateTotalWin() {
    let totalWin: number = 0;
    this.playerSpots.forEach((playerSpot) => {
      totalWin += playerSpot.roundResult;
    });
    mainStore.userStore.setTotalWin(totalWin);
  }

  @action
  calculateRoundResults() {
    const dealerPoints = mainStore.roomStore.dealerPoints;
    this.playerSpots.forEach((playerSpot) => {
      const spotPoints = playerSpot.points;
      if (spotPoints > dealerPoints && spotPoints <= 21) {
        playerSpot.roundResult += playerSpot.previousBet * 2;
      } else if (spotPoints < dealerPoints || spotPoints > 21) {
        playerSpot.roundResult -= playerSpot.previousBet;
      } else if (spotPoints === dealerPoints && spotPoints <= 21) {
        playerSpot.roundResult = playerSpot.previousBet;
      }
    });
  }

  @action
  clear() {
    this.playerSpots.forEach((playerSpot) => {
      playerSpot.bet = 0;
      playerSpot.hand = [];
      playerSpot.points = 0;
      playerSpot.roundResult = 0;
    });
  }
}
