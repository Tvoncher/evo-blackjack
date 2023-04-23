import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  IBaseCameraParams,
  IBaseLightParams,
  IPlayerSpotsPositions,
} from "../types/types";

export const startingBalance: number = 1000;

export const baseCameraParams: IBaseCameraParams = {
  alpha: Math.PI / 2,
  beta: Math.PI / 2.8,
  radius: 7,
  target: new Vector3(0, 2, 0),
};

export const baseLightParams: IBaseLightParams = {
  intensity: 0.7,
  direction: new Vector3(0, 1, 0),
};

export const playerSpotsPositions: IPlayerSpotsPositions = {
  0: new Vector3(-1.7, 3.1, 2.7),
  1: new Vector3(-1, 3.1, 3.4),
  2: new Vector3(0, 3.1, 3.7),
  3: new Vector3(1, 3.1, 3.4),
  4: new Vector3(1.7, 3.1, 2.7),
};

export const dealerSpotPosition: Vector3 = new Vector3(0, 3.1, 2.7);
