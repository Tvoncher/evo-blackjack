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

    //setting user state if user is found
    if (data) {
      const parsedData: IUser = JSON.parse(data);
      this.user = { ...this.user, ...parsedData };
    } else createNewUser();
  }

  @action
  clear() {
    this.user.totalBet = 0;
    this.user.selectedChip = 0;
  }
}
