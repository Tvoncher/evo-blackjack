import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  IBaseCameraParams,
  IBaseLightParams,
  IPlayerSpotsPositions,
} from "../types/types";

export const startingBalance: number = 1000;

export const baseCameraParams: IBaseCameraParams = {
  alpha: Math.PI / 2,
  beta: Math.PI / 2.6,
  radius: 1.9,
  target: new Vector3(0, 1, 0),
};

export const baseLightParams: IBaseLightParams = {
  intensity: 0.7,
  direction: new Vector3(0, 1, 0),
};

export const playerSpotsPositions: IPlayerSpotsPositions = {
  0: new Vector3(-0.56, 1.03, 0.4),
  1: new Vector3(-0.3, 1.03, 0.63),
  2: new Vector3(0, 1.03, 0.73),
  3: new Vector3(0.3, 1.03, 0.63),
  4: new Vector3(0.56, 1.03, 0.4),
};

export const dealerSpotPosition: Vector3 = new Vector3(0, 1.05, 0.3);
