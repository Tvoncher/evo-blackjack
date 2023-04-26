import {
  IReactionDisposer,
  action,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { ICard, RoomState } from "../types/types";
import { shuffleDeck } from "../utils/utils";
import { clearStoresData, findActiveSpot } from "../utils/gameLogic";
import { mainStore } from "./MainStore";
import {
  DEALING_ANIMATION_DURATION,
  ROUND_RESTART_WAIT_TIME,
} from "../utils/consts";
import { dealCard } from "../utils/buttons";

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
  disposeReaction: IReactionDisposer;

  public constructor() {
    makeObservable(this);

    this.disposeReaction = reaction(
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

          case RoomState.ending:
            mainStore.playerSpotsStore.calculateTotalWin();
            mainStore.userStore.setBalance();
            setTimeout(() => {
              clearStoresData();
              this.setRoomState(RoomState.waiting);
            }, ROUND_RESTART_WAIT_TIME);
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
  takeCards(numOfCards: number) {
    return this.deck.splice(0, numOfCards);
  }

  @action
  recalculateDealerPoints() {
    let newPoints: number = 0;
    if (this.dealerHand.length > 2) {
      this.dealerHand.forEach((card) => (newPoints += card.value));
      this.dealerPoints = newPoints;
    } else this.dealerPoints = this.dealerHand[0].value;
  }

  //hits at 16 and below
  @action
  runDealerLogic(): void {
    setTimeout(() => {
      if (this.dealerPoints <= 16) {
        dealCard("dealer");
        this.recalculateDealerPoints();
        return this.runDealerLogic();
      }
    }, 1000);
  }

  @action
  clear() {
    this.dealerHand = [];
    this.dealerPoints = 0;
  }
}
