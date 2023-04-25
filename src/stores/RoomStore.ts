import {
  IReactionDisposer,
  action,
  configure,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { ICard, RoomState } from "../types/types";
import { shuffleDeck } from "../utils/utils";

import { clearEverything, findActiveSpot } from "../utils/gameLogic";
import { mainStore } from "./MainStore";

configure({ enforceActions: "observed" });

//handling everything related to room - state,dealer,deck of cards
export class RoomStore {
  @observable
  dealerCards: ICard[] = [];

  @observable
  deck: ICard[] = [];

  @observable
  dealerPoints: number = 0;

  @observable
  roomState: RoomState = RoomState.waiting;

  @observable
  isLoading: boolean = true;

  @observable
  disposeReaction: IReactionDisposer;

  public constructor() {
    makeObservable(this);

    this.disposeReaction = reaction(
      () => this.roomState,
      (newState) => {
        switch (newState) {
          case RoomState.dealing:
            this.dealerCards = this.takeCards(2);
            setTimeout(() => {
              this.setRoomState(RoomState.playing);
            }, 1700);
            break;

          case RoomState.playing:
            setTimeout(() => {
              findActiveSpot();
            }, 1000);
            break;

          case RoomState.ending:
            mainStore.playerSpotsStore.calculateTotalWin();
            mainStore.userStore.setBalance();
            setTimeout(() => {
              clearEverything();
              this.setRoomState(RoomState.waiting);
            }, 3500);
            break;

          case RoomState.waiting:
            setTimeout(() => {
              this.setRoomState(RoomState.betting);
            }, 1000);
            break;
        }
      }
    );
  }

  @action
  setIsLoaded() {
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
  takeCards(numOfCards: number) {
    return this.deck.splice(0, numOfCards);
  }

  @action
  recalculateDealerPoints() {
    let newPoints: number = 0;
    if (this.dealerCards.length > 2) {
      this.dealerCards.forEach((card) => (newPoints += card.value));
      this.dealerPoints = newPoints;
    } else this.dealerPoints = this.dealerCards[0].value;
  }

  @action
  runDealerLogic(): void {
    setTimeout(() => {
      if (this.dealerPoints <= 16) {
        const newDealerCards = this.takeCards(1);
        this.dealerCards = [...this.dealerCards, ...newDealerCards];
        this.recalculateDealerPoints();
        return this.runDealerLogic();
      }
    }, 300);
  }

  @action
  clear() {
    this.dealerCards = [];
    this.dealerPoints = 0;
  }
}
