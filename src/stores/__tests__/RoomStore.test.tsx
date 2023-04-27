import { ICard, RoomState } from "../../types/types";
import { RoomStore } from "../RoomStore";

const dummyCards: ICard[] = [
  {
    suit: "hearts",
    rank: 2,
    value: 2,
  },
  {
    suit: "diamonds",
    rank: 5,
    value: 5,
  },
  {
    suit: "clubs",
    rank: "q",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "A",
    value: 11,
  },
];

describe("create RoomStore", () => {
  it("should initiate clear store", () => {
    const store = new RoomStore();

    expect(store.dealerHand).toHaveLength(0);
    expect(store.dealerPoints).toBe(0);
    expect(store.deck.length).toBe(208);
    expect(store.hasDealerPlayed).toBeFalsy;
    expect(store.isLoading).toBeTruthy;
    expect(store.roomState).toBe(RoomState.waiting);
  });
});

describe("setting dealer hand", () => {
  it("should should give dealer 2 cards", () => {
    const store = new RoomStore();
    store.deck = dummyCards;
    store.setDealerHand(2);

    expect(store.dealerHand).toHaveLength(2);
    expect(store.dealerHand).toStrictEqual([
      {
        suit: "hearts",
        rank: 2,
        value: 2,
      },
      {
        suit: "diamonds",
        rank: 5,
        value: 5,
      },
    ]);
  });
});
