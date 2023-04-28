import { createContext } from "react";
import { PlayerSpotsStore } from "./PlayerSpotsStore";
import { configure, makeObservable, observable } from "mobx";
import { UserStore } from "./UserStore";
import { RoomStore } from "./RoomStore";

//handling all stores together
configure({ enforceActions: "always" });
export class MainStore {
  @observable
  playerSpotsStore = new PlayerSpotsStore();
  @observable
  roomStore = new RoomStore();
  @observable
  userStore = new UserStore();

  constructor() {
    makeObservable(this);
  }
}

export const mainStore = new MainStore();
export const MainStoreContext = createContext<MainStore>(mainStore);
