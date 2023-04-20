import {
  IReactionDisposer,
  action,
  configure,
  makeObservable,
  observable,
  reaction,
  toJS,
} from "mobx";
import { ICard, RoomState } from "../types/types";
import { shuffleDeck } from "../utils/utils";

import { clearEverything, findActiveSpot } from "../utils/gameLogic";

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
  disposeReaction: IReactionDisposer;

  public constructor() {
    makeObservable(this);

    //TODO: rewrite with case-switch. maybe export somewhere
    this.disposeReaction = reaction(
      () => this.roomState,
      (newState) => {
        if (newState === RoomState.dealing) {
          //play dealing animation
          //deal cards
          //TODO:rewrite as actions and separate function
          //userStore.user.cards = this.takeCards(2);
          this.dealerCards = this.takeCards(2);

          setTimeout(() => {
            this.setRoomState(RoomState.playing);
          }, 1700);
        } else if (newState === RoomState.playing) {
          setTimeout(() => {
            findActiveSpot();
          }, 1000);
        } else if (newState === RoomState.ending) {
          setTimeout(() => {
            clearEverything();
            this.setRoomState(RoomState.waiting);
          }, 2000);
        } else if (newState === RoomState.waiting) {
          setTimeout(() => {
            this.setRoomState(RoomState.betting);
          }, 1000);
        }
      }
    );
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
    this.dealerCards.forEach((card) => (newPoints += card.value));
    this.dealerPoints = newPoints;
  }

  @action
  clear() {
    this.dealerCards = [];
    this.dealerPoints = 0;
  }
}
