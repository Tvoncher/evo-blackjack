import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export interface IUser {
  balance: number;
  username: string;
  totalBet: number;
}

export interface ICard {
  rank: number | string;
  suit: string | Suit;
  value: number;
}

export interface IRoom {
  dealerHand: ICard[];
  roomState: RoomState;
  deck: ICard[];
}

export enum RoomState {
  betting = "betting",
  dealing = "dealing",
  playing = "playing",
  waiting = "waiting",
  dealerPlaying = "dealerPlaying",
  ending = "ending",
}

export enum Suit {
  clubs = "clubs",
  diamonds = "diamonds",
  hearts = "hearts",
  spades = "spades",
}

export enum PlayerSpotStatus {
  active = "active",
  inactive = "inactive",
}

export enum endgameStatus {
  win = "win",
  lose = "lose",
  tie = "tie",
}

export interface IPlayerSpot {
  bet: number;
  hand: ICard[];
  points: number;
  previousBet: number;
  status: PlayerSpotStatus;
  index: number;
  roundProfit: number;
  endgameStatus: endgameStatus;
}

export interface ICardsTooltip {
  points: number;
  endgameStatus: endgameStatus;
}

export interface GreetingProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPlayerSpotMaterialProps {
  playerSpotChipsLength: number;
}

export interface IBaseCameraParams {
  alpha: number;
  beta: number;
  radius: number;
  target: Vector3;
  minZ: number;
}

export interface IPlayerSpotChipProps {
  chip: number;
  position: Vector3;
  roomState: RoomState;
}

export interface ICardProps {
  card: Mesh;
  value: number;
  offset: number;
  rank: string | number;
  suit: Suit | string;
  position: Vector3;
  rotation: Vector3;
}

export interface IBaseLightParams {
  intensity: number;
  direction: Vector3;
}

export interface IChipProps {
  name: string;
  position: Vector3;
}

export interface IPlayerSpotProps {
  points: number;
  position: Vector3;
  rotation: Vector3;
  index: number;
  endgameStatus: endgameStatus;
  status: PlayerSpotStatus;
}
