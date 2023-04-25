import { action, configure, makeObservable, observable, toJS } from "mobx";
import { IPlayerSpot, PlayerSpotStatus } from "../types/types";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { playerSpotsPositions } from "../utils/consts";

configure({ enforceActions: "observed" });

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
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 1,
      points: 0,
      previousBet: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,

      index: 2,
      points: 0,
      previousBet: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 3,
      points: 0,
      previousBet: 0,
    },
    {
      hand: [],
      bet: 0,
      status: PlayerSpotStatus.inactive,
      index: 4,
      points: 0,
      previousBet: 0,
    },
  ];

  public constructor() {
    makeObservable(this);
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
    this.playerSpots[index].bet = 0;
  }

  @action
  recalculatePoints(index: number) {
    let newPoints: number = 0;
    this.playerSpots[index].hand.forEach((card) => (newPoints += card.value));
    this.playerSpots[index].points = newPoints;
  }

  @action
  clear() {
    this.playerSpots.forEach((playerSpot) => {
      playerSpot.bet = 0;
      playerSpot.hand = [];
      playerSpot.points = 0;
    });
  }
}
