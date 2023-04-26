import { action, makeObservable, observable } from "mobx";
import {
  IPlayerSpot,
  PlayerSpotStatus,
  roundWinningStatus,
} from "../types/types";
import { mainStore } from "./MainStore";

//handling all playerSpots data
export class PlayerSpotsStore {
  @observable
  playerSpots: IPlayerSpot[] = [
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 0,
      points: 0,
      previousBet: 0,
      roundProfit: 0,
      roundWinningStatus: roundWinningStatus.lose,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 1,
      points: 0,
      previousBet: 0,
      roundProfit: 0,
      roundWinningStatus: roundWinningStatus.lose,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 2,
      points: 0,
      previousBet: 0,
      roundProfit: 0,
      roundWinningStatus: roundWinningStatus.lose,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 3,
      points: 0,
      previousBet: 0,
      roundProfit: 0,
      roundWinningStatus: roundWinningStatus.lose,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 4,
      points: 0,
      previousBet: 0,
      roundProfit: 0,
      roundWinningStatus: roundWinningStatus.lose,
    },
  ];

  @observable
  activePlayerSpotIndex: number | undefined = undefined;

  public constructor() {
    makeObservable(this);
  }

  @action
  setPlayerSpotHand(numOfCards: number, spotIndex: number) {
    this.playerSpots[spotIndex].hand = [
      ...this.playerSpots[spotIndex].hand,
      ...mainStore.roomStore.takeCards(numOfCards),
    ];
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
    //need to store previous bet for rebet logic
    this.playerSpots[index].previousBet = this.playerSpots[index].bet;
    this.playerSpots[index].bet = 0;
  }

  @action
  recalculatePoints(index: number) {
    let newPoints: number = 0;
    let aces: number = 0;

    this.playerSpots[index].hand.forEach((card) => {
      if (card.rank === "A") {
        aces++;
        newPoints += 11;
      } else newPoints += card.value;
    });

    for (let i = 0; i < aces; i++) {
      if (newPoints > 21) {
        newPoints -= 10;
      }
    }
    this.playerSpots[index].points = newPoints;
  }

  @action
  calculateTotalWin() {
    let totalWin: number = 0;
    this.playerSpots.forEach((playerSpot) => {
      totalWin += playerSpot.roundProfit;
    });
    mainStore.userStore.setTotalWin(totalWin);
  }

  @action
  calculateRoundProfits() {
    this.playerSpots.forEach((playerSpot) => {
      const spotWinningStatus = playerSpot.roundWinningStatus;

      switch (spotWinningStatus) {
        case roundWinningStatus.win:
          playerSpot.roundProfit += playerSpot.previousBet;
          break;

        case roundWinningStatus.lose:
          playerSpot.roundProfit -= playerSpot.previousBet;
          break;

        case roundWinningStatus.tie:
          playerSpot.roundProfit = playerSpot.previousBet;
          break;
      }
    });
  }

  @action
  setWinners() {
    const dealerPoints = mainStore.roomStore.dealerPoints;
    this.playerSpots.forEach((playerSpot) => {
      const spotPoints = playerSpot.points;

      if (spotPoints > 21) {
        playerSpot.roundWinningStatus = roundWinningStatus.lose;
      } else if (dealerPoints > 21) {
        playerSpot.roundWinningStatus = roundWinningStatus.win;
      } else if (spotPoints > dealerPoints) {
        playerSpot.roundWinningStatus = roundWinningStatus.win;
      } else if (spotPoints < dealerPoints) {
        playerSpot.roundWinningStatus = roundWinningStatus.lose;
      } else {
        playerSpot.roundWinningStatus = roundWinningStatus.tie;
      }
    });
  }

  @action
  clear() {
    this.playerSpots.forEach((playerSpot) => {
      playerSpot.bet = 0;
      playerSpot.hand = [];
      playerSpot.points = 0;
      playerSpot.roundProfit = 0;
      playerSpot.roundWinningStatus = roundWinningStatus.lose;
    });
  }
}
