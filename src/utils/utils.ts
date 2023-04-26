import { mainStore } from "../stores/MainStore";
import { IUser, RoomState } from "../types/types";
import { STARTING_BALANCE } from "./consts";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const shuffleDeck = () => {
  let shuffledDeck = [...initialDeck];

  for (let i: number = shuffledDeck.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));

    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};

export const createNewUser = () => {
  const newUser: IUser = {
    balance: STARTING_BALANCE,
    username: RandomUsername,
    totalBet: 0,
  };

  //pushing newly created user to app state
  mainStore.userStore.setUser(newUser);
};

const RandomUsername = `user${Math.floor(Math.random() * 10)}${Math.floor(
  Math.random() * 10
)}${Math.floor(Math.random() * 10)}`;

export const startGame = () => {
  setTimeout(() => {
    //creating and assigning new shuffled deck
    mainStore.roomStore.shuffleDeck();
    //changing room state to awaiting bets
    mainStore.roomStore.setRoomState(RoomState.betting);
  }, 1000);
};

export const runAnim = (animation: AnimationGroup) => {
  animation.play();
};

//setting actions/events like onHover/onMouseOver
export const registerChipActions = (chip: Mesh) => {
  chip.actionManager = new ActionManager(chip.getScene());
  chip.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickTrigger, function () {
      chip.scaling = Vector3.One();
      mainStore.userStore.setSelectedChip(+chip.name);
    })
  );

  chip.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function () {
      chip.scaling = new Vector3(1.1, 1.1, 1.1);
    })
  );
  //on mouseOut
  chip.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function () {
      chip.scaling = new Vector3(1, 1, 1);
    })
  );
};

export const loadUser = (userData: string) => {
  const parsedData: IUser = JSON.parse(userData);
  mainStore.userStore.user = {
    ...mainStore.userStore.user,
    username: parsedData.username,
    balance: parsedData.balance,
  };
};

export const initialDeck = [
  {
    suit: "hearts",
    rank: 2,
    value: 2,
  },
  {
    suit: "hearts",
    rank: 3,
    value: 3,
  },
  {
    suit: "hearts",
    rank: 4,
    value: 4,
  },
  {
    suit: "hearts",
    rank: 5,
    value: 5,
  },
  {
    suit: "hearts",
    rank: 6,
    value: 6,
  },
  {
    suit: "hearts",
    rank: 7,
    value: 7,
  },
  {
    suit: "hearts",
    rank: 8,
    value: 8,
  },
  {
    suit: "hearts",
    rank: 9,
    value: 9,
  },
  {
    suit: "hearts",
    rank: 10,
    value: 10,
  },
  {
    suit: "hearts",
    rank: "J",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "Q",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "K",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "diamonds",
    rank: 2,
    value: 2,
  },
  {
    suit: "diamonds",
    rank: 3,
    value: 3,
  },
  {
    suit: "diamonds",
    rank: 4,
    value: 4,
  },
  {
    suit: "diamonds",
    rank: 5,
    value: 5,
  },
  {
    suit: "diamonds",
    rank: 6,
    value: 6,
  },
  {
    suit: "diamonds",
    rank: 7,
    value: 7,
  },
  {
    suit: "diamonds",
    rank: 8,
    value: 8,
  },
  {
    suit: "diamonds",
    rank: 9,
    value: 9,
  },
  {
    suit: "diamonds",
    rank: 10,
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "J",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "Q",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "K",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "clubs",
    rank: 2,
    value: 2,
  },
  {
    suit: "clubs",
    rank: 3,
    value: 3,
  },
  {
    suit: "clubs",
    rank: 4,
    value: 4,
  },
  {
    suit: "clubs",
    rank: 5,
    value: 5,
  },
  {
    suit: "clubs",
    rank: 6,
    value: 6,
  },
  {
    suit: "clubs",
    rank: 7,
    value: 7,
  },
  {
    suit: "clubs",
    rank: 8,
    value: 8,
  },
  {
    suit: "clubs",
    rank: 9,
    value: 9,
  },
  {
    suit: "clubs",
    rank: 10,
    value: 10,
  },
  {
    suit: "clubs",
    rank: "J",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "Q",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "K",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "spades",
    rank: 2,
    value: 2,
  },
  {
    suit: "spades",
    rank: 3,
    value: 3,
  },
  {
    suit: "spades",
    rank: 4,
    value: 4,
  },
  {
    suit: "spades",
    rank: 5,
    value: 5,
  },
  {
    suit: "spades",
    rank: 6,
    value: 6,
  },
  {
    suit: "spades",
    rank: 7,
    value: 7,
  },
  {
    suit: "spades",
    rank: 8,
    value: 8,
  },
  {
    suit: "spades",
    rank: 9,
    value: 9,
  },
  {
    suit: "spades",
    rank: 10,
    value: 10,
  },
  {
    suit: "spades",
    rank: "J",
    value: 10,
  },
  {
    suit: "spades",
    rank: "Q",
    value: 10,
  },
  {
    suit: "spades",
    rank: "K",
    value: 10,
  },
  {
    suit: "spades",
    rank: "A",
    value: 1 | 11,
  },

  {
    suit: "hearts",
    rank: 2,
    value: 2,
  },
  {
    suit: "hearts",
    rank: 3,
    value: 3,
  },
  {
    suit: "hearts",
    rank: 4,
    value: 4,
  },
  {
    suit: "hearts",
    rank: 5,
    value: 5,
  },
  {
    suit: "hearts",
    rank: 6,
    value: 6,
  },
  {
    suit: "hearts",
    rank: 7,
    value: 7,
  },
  {
    suit: "hearts",
    rank: 8,
    value: 8,
  },
  {
    suit: "hearts",
    rank: 9,
    value: 9,
  },
  {
    suit: "hearts",
    rank: 10,
    value: 10,
  },
  {
    suit: "hearts",
    rank: "J",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "Q",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "K",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "diamonds",
    rank: 2,
    value: 2,
  },
  {
    suit: "diamonds",
    rank: 3,
    value: 3,
  },
  {
    suit: "diamonds",
    rank: 4,
    value: 4,
  },
  {
    suit: "diamonds",
    rank: 5,
    value: 5,
  },
  {
    suit: "diamonds",
    rank: 6,
    value: 6,
  },
  {
    suit: "diamonds",
    rank: 7,
    value: 7,
  },
  {
    suit: "diamonds",
    rank: 8,
    value: 8,
  },
  {
    suit: "diamonds",
    rank: 9,
    value: 9,
  },
  {
    suit: "diamonds",
    rank: 10,
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "J",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "Q",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "K",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "clubs",
    rank: 2,
    value: 2,
  },
  {
    suit: "clubs",
    rank: 3,
    value: 3,
  },
  {
    suit: "clubs",
    rank: 4,
    value: 4,
  },
  {
    suit: "clubs",
    rank: 5,
    value: 5,
  },
  {
    suit: "clubs",
    rank: 6,
    value: 6,
  },
  {
    suit: "clubs",
    rank: 7,
    value: 7,
  },
  {
    suit: "clubs",
    rank: 8,
    value: 8,
  },
  {
    suit: "clubs",
    rank: 9,
    value: 9,
  },
  {
    suit: "clubs",
    rank: 10,
    value: 10,
  },
  {
    suit: "clubs",
    rank: "J",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "Q",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "K",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "spades",
    rank: 2,
    value: 2,
  },
  {
    suit: "spades",
    rank: 3,
    value: 3,
  },
  {
    suit: "spades",
    rank: 4,
    value: 4,
  },
  {
    suit: "spades",
    rank: 5,
    value: 5,
  },
  {
    suit: "spades",
    rank: 6,
    value: 6,
  },
  {
    suit: "spades",
    rank: 7,
    value: 7,
  },
  {
    suit: "spades",
    rank: 8,
    value: 8,
  },
  {
    suit: "spades",
    rank: 9,
    value: 9,
  },
  {
    suit: "spades",
    rank: 10,
    value: 10,
  },
  {
    suit: "spades",
    rank: "J",
    value: 10,
  },
  {
    suit: "spades",
    rank: "Q",
    value: 10,
  },
  {
    suit: "spades",
    rank: "K",
    value: 10,
  },
  {
    suit: "spades",
    rank: "A",
    value: 1 | 11,
  },

  {
    suit: "hearts",
    rank: 2,
    value: 2,
  },
  {
    suit: "hearts",
    rank: 3,
    value: 3,
  },
  {
    suit: "hearts",
    rank: 4,
    value: 4,
  },
  {
    suit: "hearts",
    rank: 5,
    value: 5,
  },
  {
    suit: "hearts",
    rank: 6,
    value: 6,
  },
  {
    suit: "hearts",
    rank: 7,
    value: 7,
  },
  {
    suit: "hearts",
    rank: 8,
    value: 8,
  },
  {
    suit: "hearts",
    rank: 9,
    value: 9,
  },
  {
    suit: "hearts",
    rank: 10,
    value: 10,
  },
  {
    suit: "hearts",
    rank: "J",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "Q",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "K",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "diamonds",
    rank: 2,
    value: 2,
  },
  {
    suit: "diamonds",
    rank: 3,
    value: 3,
  },
  {
    suit: "diamonds",
    rank: 4,
    value: 4,
  },
  {
    suit: "diamonds",
    rank: 5,
    value: 5,
  },
  {
    suit: "diamonds",
    rank: 6,
    value: 6,
  },
  {
    suit: "diamonds",
    rank: 7,
    value: 7,
  },
  {
    suit: "diamonds",
    rank: 8,
    value: 8,
  },
  {
    suit: "diamonds",
    rank: 9,
    value: 9,
  },
  {
    suit: "diamonds",
    rank: 10,
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "J",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "Q",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "K",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "clubs",
    rank: 2,
    value: 2,
  },
  {
    suit: "clubs",
    rank: 3,
    value: 3,
  },
  {
    suit: "clubs",
    rank: 4,
    value: 4,
  },
  {
    suit: "clubs",
    rank: 5,
    value: 5,
  },
  {
    suit: "clubs",
    rank: 6,
    value: 6,
  },
  {
    suit: "clubs",
    rank: 7,
    value: 7,
  },
  {
    suit: "clubs",
    rank: 8,
    value: 8,
  },
  {
    suit: "clubs",
    rank: 9,
    value: 9,
  },
  {
    suit: "clubs",
    rank: 10,
    value: 10,
  },
  {
    suit: "clubs",
    rank: "J",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "Q",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "K",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "spades",
    rank: 2,
    value: 2,
  },
  {
    suit: "spades",
    rank: 3,
    value: 3,
  },
  {
    suit: "spades",
    rank: 4,
    value: 4,
  },
  {
    suit: "spades",
    rank: 5,
    value: 5,
  },
  {
    suit: "spades",
    rank: 6,
    value: 6,
  },
  {
    suit: "spades",
    rank: 7,
    value: 7,
  },
  {
    suit: "spades",
    rank: 8,
    value: 8,
  },
  {
    suit: "spades",
    rank: 9,
    value: 9,
  },
  {
    suit: "spades",
    rank: 10,
    value: 10,
  },
  {
    suit: "spades",
    rank: "J",
    value: 10,
  },
  {
    suit: "spades",
    rank: "Q",
    value: 10,
  },
  {
    suit: "spades",
    rank: "K",
    value: 10,
  },
  {
    suit: "spades",
    rank: "A",
    value: 1 | 11,
  },

  {
    suit: "hearts",
    rank: 2,
    value: 2,
  },
  {
    suit: "hearts",
    rank: 3,
    value: 3,
  },
  {
    suit: "hearts",
    rank: 4,
    value: 4,
  },
  {
    suit: "hearts",
    rank: 5,
    value: 5,
  },
  {
    suit: "hearts",
    rank: 6,
    value: 6,
  },
  {
    suit: "hearts",
    rank: 7,
    value: 7,
  },
  {
    suit: "hearts",
    rank: 8,
    value: 8,
  },
  {
    suit: "hearts",
    rank: 9,
    value: 9,
  },
  {
    suit: "hearts",
    rank: 10,
    value: 10,
  },
  {
    suit: "hearts",
    rank: "J",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "Q",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "K",
    value: 10,
  },
  {
    suit: "hearts",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "diamonds",
    rank: 2,
    value: 2,
  },
  {
    suit: "diamonds",
    rank: 3,
    value: 3,
  },
  {
    suit: "diamonds",
    rank: 4,
    value: 4,
  },
  {
    suit: "diamonds",
    rank: 5,
    value: 5,
  },
  {
    suit: "diamonds",
    rank: 6,
    value: 6,
  },
  {
    suit: "diamonds",
    rank: 7,
    value: 7,
  },
  {
    suit: "diamonds",
    rank: 8,
    value: 8,
  },
  {
    suit: "diamonds",
    rank: 9,
    value: 9,
  },
  {
    suit: "diamonds",
    rank: 10,
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "J",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "Q",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "K",
    value: 10,
  },
  {
    suit: "diamonds",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "clubs",
    rank: 2,
    value: 2,
  },
  {
    suit: "clubs",
    rank: 3,
    value: 3,
  },
  {
    suit: "clubs",
    rank: 4,
    value: 4,
  },
  {
    suit: "clubs",
    rank: 5,
    value: 5,
  },
  {
    suit: "clubs",
    rank: 6,
    value: 6,
  },
  {
    suit: "clubs",
    rank: 7,
    value: 7,
  },
  {
    suit: "clubs",
    rank: 8,
    value: 8,
  },
  {
    suit: "clubs",
    rank: 9,
    value: 9,
  },
  {
    suit: "clubs",
    rank: 10,
    value: 10,
  },
  {
    suit: "clubs",
    rank: "J",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "Q",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "K",
    value: 10,
  },
  {
    suit: "clubs",
    rank: "A",
    value: 1 | 11,
  },
  {
    suit: "spades",
    rank: 2,
    value: 2,
  },
  {
    suit: "spades",
    rank: 3,
    value: 3,
  },
  {
    suit: "spades",
    rank: 4,
    value: 4,
  },
  {
    suit: "spades",
    rank: 5,
    value: 5,
  },
  {
    suit: "spades",
    rank: 6,
    value: 6,
  },
  {
    suit: "spades",
    rank: 7,
    value: 7,
  },
  {
    suit: "spades",
    rank: 8,
    value: 8,
  },
  {
    suit: "spades",
    rank: 9,
    value: 9,
  },
  {
    suit: "spades",
    rank: 10,
    value: 10,
  },
  {
    suit: "spades",
    rank: "J",
    value: 10,
  },
  {
    suit: "spades",
    rank: "Q",
    value: 10,
  },
  {
    suit: "spades",
    rank: "K",
    value: 10,
  },
  {
    suit: "spades",
    rank: "A",
    value: 1 | 11,
  },
];
