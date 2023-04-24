import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export interface IUser {
  balance: number;
  totalBet: number;
  selectedChip: number;
  username: string;
}

export interface ICard {
  rank: number | string;
  suit: string;
  value: number;
}

export interface IRoom {
  dealerCards: ICard[];
  roomState: RoomState;
  deck: ICard[];
}

export enum RoomState {
  betting = "betting",
  dealing = "dealing",
  playing = "playing",
  waiting = "waiting",
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

export interface IPlayerSpot {
  bet: number;
  hand: ICard[];
  points: number;
  position: Vector3;
  rotation: Vector3;
  status: PlayerSpotStatus;
  index: number;
}

export interface IPlayerSpotsPositions {
  0: Vector3;
  1: Vector3;
  2: Vector3;
  3: Vector3;
  4: Vector3;
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
  status: PlayerSpotStatus;
}
