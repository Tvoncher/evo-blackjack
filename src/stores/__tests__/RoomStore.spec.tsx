import { ICard, RoomState } from "../../types/types";
import { DEALING_ANIMATION_DURATION } from "../../utils/consts";
import { MainStore } from "../MainStore";

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

describe("roomStore", () => {
  const mainStore = new MainStore();
  const roomStore = mainStore.roomStore;

  it("should initiate clear store", () => {
    expect(roomStore.dealerHand).toHaveLength(0);
    expect(roomStore.dealerPoints).toBe(0);
    expect(roomStore.deck).toHaveLength(0);
    expect(roomStore.hasDealerPlayed).toBeFalsy;
    expect(roomStore.isLoading).toBeTruthy;
    expect(roomStore.roomState).toBe(RoomState.waiting);
  });

  it("should turn off isLoading state", () => {
    roomStore.setIsLoading();
    expect(roomStore.isLoading).toBe(false);
  });

  it("should change room states", () => {
    roomStore.setRoomState(RoomState.betting);
    expect(roomStore.roomState).toBe(RoomState.betting);

    roomStore.setRoomState(RoomState.dealerPlaying);
    expect(roomStore.roomState).toBe(RoomState.dealerPlaying);

    roomStore.setRoomState(RoomState.dealing);
    expect(roomStore.roomState).toBe(RoomState.dealing);

    roomStore.setRoomState(RoomState.ending);
    expect(roomStore.roomState).toBe(RoomState.ending);

    roomStore.setRoomState(RoomState.playing);
    expect(roomStore.roomState).toBe(RoomState.playing);

    //reaction immediately changes waiting to betting. waiting is only needed at the beginning
    roomStore.setRoomState(RoomState.waiting);
    expect(roomStore.roomState).toBe(RoomState.betting);
  });

  it("should set deck to shuffled one", () => {
    roomStore.shuffleDeck();
    expect(roomStore.deck).toHaveLength(208);
    const oldDeck = roomStore.deck;
    roomStore.shuffleDeck();
    expect(roomStore.deck).not.toEqual(oldDeck);
  });

  it("should set dealer hand", () => {
    roomStore.deck = [dummyCards[0], dummyCards[1]];
    roomStore.setDealerHand(2);
    expect(roomStore.dealerHand).toStrictEqual([dummyCards[0], dummyCards[1]]);
  });

  it("should return cards array in proper order", () => {
    roomStore.deck = [
      dummyCards[0],
      dummyCards[1],
      dummyCards[2],
      dummyCards[3],
    ];
    expect(roomStore.takeCards(2)).toStrictEqual([
      dummyCards[0],
      dummyCards[1],
    ]);
    expect(roomStore.takeCards(2)).toStrictEqual([
      dummyCards[2],
      dummyCards[3],
    ]);
  });

  it("should recalculate dealer points", () => {
    roomStore.dealerHand = [dummyCards[0], dummyCards[1]];
    roomStore.recalculateDealerPoints();
    expect(roomStore.dealerPoints).toBe(21);

    // two aces. should not bust
    roomStore.dealerHand = [dummyCards[0], dummyCards[2]];
    roomStore.recalculateDealerPoints();
    expect(roomStore.dealerPoints).toBeLessThan(21);

    //testing two aces and 10. should not bust
    roomStore.dealerHand = [dummyCards[0], dummyCards[1], dummyCards[2]];
    roomStore.recalculateDealerPoints();
    expect(roomStore.dealerPoints).toBeLessThan(21);

    //10 + 3
    roomStore.dealerHand = [dummyCards[1], dummyCards[3]];
    roomStore.recalculateDealerPoints();
    expect(roomStore.dealerPoints).toBe(13);
  });

  it("should clear store data", () => {
    roomStore.dealerHand = [dummyCards[0], dummyCards[2]];
    roomStore.dealerPoints = 100;
    roomStore.hasDealerPlayed = true;
    roomStore.clear();

    expect(roomStore.dealerHand).toHaveLength(0);
    expect(roomStore.dealerPoints).toBe(0);
    expect(roomStore.hasDealerPlayed).toBe(false);
  });
});
