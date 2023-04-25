import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  IBaseCameraParams,
  IBaseLightParams,
  IChipProps,
} from "../types/types";
import { Color3 } from "@babylonjs/core/Maths/math";

export const startingBalance: number = 1000;

export const baseCameraParams: IBaseCameraParams = {
  alpha: Math.PI / 2,
  beta: Math.PI / 2.6,
  radius: 1.9,
  target: new Vector3(0, 1, 0),
  minZ: 0,
};

export const baseLightParams: IBaseLightParams = {
  intensity: 0.7,
  direction: new Vector3(0, 1, 0),
};

export const playerSpotsPositions: Vector3[] = [
  new Vector3(-0.56, 1.03, 0.4),
  new Vector3(-0.3, 1.03, 0.63),
  new Vector3(0, 1.03, 0.73),
  new Vector3(0.3, 1.03, 0.63),
  new Vector3(0.56, 1.03, 0.4),
];

export const playerSpotsRotation: Vector3[] = [
  new Vector3(0, -Math.PI / 2, 0),
  new Vector3(0, -Math.PI / 4, 0),
  new Vector3(0, 0, 0),
  new Vector3(0, Math.PI / 4, 0),
  new Vector3(0, Math.PI / 2, 0),
];

export const dealerSpotPosition: Vector3 = new Vector3(0, 1.05, 0.3);

export const chipHeight = 0.01;
export const chipDiameter = 0.06;

export const chipsArray: IChipProps[] = [
  {
    name: "1",
    position: new Vector3(0.12, 1.04, 0.81),
  },
  {
    name: "5",
    position: new Vector3(0.04, 1.04, 0.83),
  },
  {
    name: "25",
    position: new Vector3(-0.04, 1.04, 0.83),
  },
  {
    name: "100",
    position: new Vector3(-0.12, 1.04, 0.81),
  },
];

export const cardScaling: Vector3 = new Vector3(0.08, 0.08, 0.08);

export const playerSpotHeight: number = 0.003;
export const playerSpotDiameter: number = 0.1;

export const chipHighlighting: Color3 = new Color3(0.7, 0.5, 0);

export const neonColor: Color3 = new Color3(0, 0.7, 1);

const cardsSpritesheetWidth = 13;
const cardsSpritesheetHeight = 4;
export const cardSpriteWidth = 1 / cardsSpritesheetWidth;
export const cardSpriteHeight = 1 / cardsSpritesheetHeight;
