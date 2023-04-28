import { IUser } from "../types/types";
import { STARTING_BALANCE } from "../utils/consts";
import { MainStore } from "../stores/MainStore";

describe("userStore", () => {
  const mainStore = new MainStore();
  const userStore = mainStore.userStore;

  it("should return valid initial data", () => {
    expect(userStore.user.balance).toBe(STARTING_BALANCE);
    expect(userStore.user.totalBet).toBe(0);
    expect(userStore.user.username).toBe("");
    expect(userStore.selectedChip).toBe(0);
    expect(userStore.totalWin).toBe(0);
  });

  it("should set selected chip", () => {
    userStore.setSelectedChip(25);
    expect(userStore.selectedChip).toBe(25);
  });

  it("should set total win", () => {
    userStore.setTotalWin(150);
    expect(userStore.totalWin).toBe(150);
  });

  it("should set balance", () => {
    userStore.addToBalance(200);
    expect(userStore.user.balance).toBe(STARTING_BALANCE + 200);
    userStore.addToBalance(-100);
    expect(userStore.user.balance).toBe(STARTING_BALANCE + 100);
  });

  it("should clear total bet and selected chip", () => {
    userStore.clear();
    expect(userStore.user.totalBet).toBe(0);
    expect(userStore.selectedChip).toBe(0);
  });

  it("should add values to total bet", () => {
    userStore.addToTotalBet(25);
    expect(userStore.user.totalBet).toBe(25);

    userStore.addToTotalBet(1);
    expect(userStore.user.totalBet).toBe(26);
  });

  it("should set user data", () => {
    const newUser: IUser = { balance: 5000, username: "Ah-oh", totalBet: 0 };
    userStore.setUser(newUser);
    expect(userStore.user.balance).toBe(5000);
    expect(userStore.user.username).toBe("Ah-oh");
    expect(userStore.user.totalBet).toBe(0);
  });
});
