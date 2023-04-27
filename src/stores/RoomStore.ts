import { action, makeObservable, observable, reaction } from "mobx";
import { ICard, RoomState } from "../types/types";
import { shuffleDeck } from "../utils/utils";
import { clearStoresData, findActiveSpot } from "../utils/gameLogic";
import { mainStore } from "./MainStore";
import {
  DEALING_ANIMATION_DURATION,
  ENDING_ANIMATION_DURATION,
  ROUND_RESTART_WAIT_TIME,
} from "../utils/consts";
import { dealCards } from "../utils/buttons";

//handling everything related to room - state,dealer,deck of cards
export class RoomStore {
  @observable
  dealerHand: ICard[] = [];

  @observable
  dealerPoints: number = 0;

  @observable
  deck: ICard[] = [];

  @observable
  roomState: RoomState = RoomState.waiting;

  @observable
  isLoading: boolean = true;

  @observable
  hasDealerPlayed: boolean = false;

  public constructor() {
    makeObservable(this);

    reaction(
      () => this.roomState,
      (newState) => {
        switch (newState) {
          case RoomState.dealing:
            //need to wait for smoother animation (called at useDealerAnimation)
            setTimeout(() => {
              this.setRoomState(RoomState.playing);
            }, DEALING_ANIMATION_DURATION);
            break;

          case RoomState.playing:
            findActiveSpot();
            break;

          case RoomState.dealerPlaying:
            mainStore.roomStore.runDealerLogic();
            break;

          case RoomState.ending:
            mainStore.playerSpotsStore.setWinners();
            mainStore.playerSpotsStore.calculateRoundProfits();
            mainStore.playerSpotsStore.calculateTotalWin();
            mainStore.userStore.setBalance(mainStore.userStore.totalWin);
            setTimeout(() => {
              clearStoresData();
              this.setRoomState(RoomState.waiting);
            }, ROUND_RESTART_WAIT_TIME + ENDING_ANIMATION_DURATION);

            if (this.deck.length <= 104) {
              shuffleDeck();
            }
            break;

          case RoomState.waiting:
            this.setRoomState(RoomState.betting);
            break;
        }
      }
    );
  }

  @action
  setIsLoading() {
    this.isLoading = false;
  }

  @action
  setRoomState(state: RoomState) {
    this.roomState = state;
  }

  @action
  shuffleDeck() {
    this.deck = shuffleDeck();
  }

  @action
  setDealerHand(numOfCards: number) {
    this.dealerHand = [...this.dealerHand, ...this.takeCards(numOfCards)];
  }

  @action
  takeCards(numOfCards: number) {
    return this.deck.splice(0, numOfCards);
  }

  @action
  recalculateDealerPoints() {
    if (this.dealerHand.length > 2) {
      let newPoints: number = 0;
      let aces: number = 0;

      this.dealerHand.forEach((card) => {
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
      this.dealerPoints = newPoints;
    }
    //hiding second card value at the beginning
    else this.dealerPoints = this.dealerHand[0].value;
  }

  //dealer hits at 16 and below
  @action
  runDealerLogic(): void {
    if (this.dealerPoints <= 16) {
      setTimeout(() => {
        dealCards("dealer", 1);
        this.recalculateDealerPoints();
        return this.runDealerLogic();
      }, 700);
    } else this.setRoomState(RoomState.ending);
  }

  @action
  clear() {
    this.dealerHand = [];
    this.dealerPoints = 0;
    this.hasDealerPlayed = false;
  }
}
