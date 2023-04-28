import { action, makeObservable, observable, reaction } from "mobx";
import { IUser } from "../types/types";
import { createNewUser, loadUser } from "../utils/utils";
import { STARTING_BALANCE } from "../utils/consts";

export class UserStore {
  @observable
  user: IUser = {
    username: "",
    balance: STARTING_BALANCE,
    totalBet: 0,
  };

  @observable
  selectedChip: number = 0;

  @observable
  totalWin: number = 0;

  public constructor() {
    makeObservable(this);

    //saving user data every time balance changes
    reaction(
      () => this.user.balance,
      () => {
        this.saveToStorage();
      }
    );
  }

  @action
  addToTotalBet(value: number) {
    this.user.totalBet += value;
  }

  @action
  setSelectedChip(value: number) {
    this.selectedChip = value;
  }

  @action
  setTotalWin(totalWin: number) {
    this.totalWin = totalWin;
  }

  @action
  addToBalance(value: number) {
    this.user.balance += value;
  }

  @action
  setUser(newUser: IUser) {
    this.user = newUser;
  }

  @action
  public saveToStorage() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  @action
  public userAuth() {
    //finding existing user
    const userData = localStorage.getItem("user");
    //setting user data if user exists
    if (userData) {
      loadUser(userData);
    } else {
      createNewUser();
    }
  }

  @action
  clear() {
    this.user.totalBet = 0;
    this.selectedChip = 0;
  }
}
