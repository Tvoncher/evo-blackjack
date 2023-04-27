import { STARTING_BALANCE } from "../../utils/consts";
import { UserStore } from "../UserStore";

describe("create UserStore", () => {
  it("should initiate store", () => {
    const store = new UserStore();

    expect(store.user.balance).toBe(STARTING_BALANCE);
    expect(store.user.totalBet).toBe(0);
  });
});

describe("setting user balance", () => {
  it("should add value to balance", () => {
    const store = new UserStore();
    store.setBalance(1539);
    expect(store.user.balance).toBe(STARTING_BALANCE + 1539);
  });

  it("should substract value from balance", () => {
    const store = new UserStore();
    store.setBalance(250);
    expect(store.user.totalBet).toBe(STARTING_BALANCE - 250);
  });
});

describe("basic actions", () => {
  it("should set selected chip", () => {
    const store = new UserStore();
    store.setSelectedChip(25);
    expect(store.setSelectedChip).toBe(25);
  });

  it("should set total win", () => {
    const store = new UserStore();
    store.setTotalWin(500);
    expect(store.totalWin).toBe(500);
  });

  it("should add value to total bet", () => {
    const store = new UserStore();
    store.addToTotalBet(100);
    expect(store.user.totalBet).toBe(100);
  });

  it("should clear store data", () => {
    const store = new UserStore();
    store.addToTotalBet(500);
    store.setSelectedChip(25);
    expect(store.totalWin).toBe(500);
    expect(store.selectedChip).toBe(25);
  });
});
