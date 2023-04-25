import {
  action,
  autorun,
  configure,
  makeObservable,
  observable,
  toJS,
} from "mobx";
import { IUser } from "../types/types";
import { createNewUser } from "../utils/utils";

configure({ enforceActions: "observed" });

export class UserStore {
  @observable
  public user: IUser = {
    username: "",
    balance: 0,
    totalBet: 0,
    selectedChip: 0,
  };

  @observable
  totalWin: number = 0;

  public constructor() {
    makeObservable(this);

    autorun(() => {
      if (this.user.balance !== 0) {
        this.saveToStorage();
      }
    });
  }

  @action
  setselectedChip(value: number) {
    this.user.selectedChip = value;
  }

  @action
  addToTotalBet(value: number) {
    this.user.totalBet += value;
  }

  @action
  setTotalWin(totalWin: number) {
    this.totalWin = totalWin;
  }

  @action
  setBalance() {
    this.user.balance += this.totalWin;
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
    const data = localStorage.getItem("user");

    //setting user state if user exists
    if (data) {
      const parsedData: IUser = JSON.parse(data);
      this.user = {
        ...this.user,
        username: parsedData.username,
        balance: parsedData.balance,
      };
    } else createNewUser();
  }

  @action
  clear() {
    this.user.totalBet = 0;
    this.user.selectedChip = 0;
  }
}
