import { createContext } from "react";
import { PlayerSpotsStore } from "./PlayerSpotsStore";
import { makeObservable, observable } from "mobx";
import { UserStore } from "./UserStore";
import { RoomStore } from "./RoomStore";

//handling all stores together
class MainStore {
  @observable
  playerSpotsStore = new PlayerSpotsStore();
  roomStore = new RoomStore();
  userStore = new UserStore();

  constructor() {
    makeObservable(this);
  }
}

export const mainStore = new MainStore();
export const MainStoreContext = createContext<MainStore | null>(null);
