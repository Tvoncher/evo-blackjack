import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  IBaseCameraParams,
  IBaseLightParams,
  ICard,
  IChipProps,
} from "../types/types";
import { Color3 } from "@babylonjs/core/Maths/math";

// babylon points
export const CHIP_HEIGHT = 0.01;
export const CHIP_DIAMETER = 0.06;

export const PLAYER_SPOT_HEIGHT: number = 0.003;
export const PLAYER_SPOT_DIAMETER: number = 0.1;

export const CARD_SCALING: Vector3 = new Vector3(0.08, 0.08, 0.08);

export const CHIP_HIGHLIGHTING_COLOR: Color3 = new Color3(0.7, 0.5, 0);

export const NEON_COLOR: Color3 = new Color3(0, 0.7, 1);

export const STARTING_BALANCE: number = 1000;

export const BASE_CAMERA_PARAMS: IBaseCameraParams = {
  alpha: Math.PI / 2,
  beta: Math.PI / 2.6,
  radius: 1.9,
  target: new Vector3(0, 1, 0),
  minZ: 0,
};

export const DEALER_SPOT_POSITION: Vector3 = new Vector3(0, 1.05, 0.3);

export const BASE_LIGHT_PARAMS: IBaseLightParams = {
  intensity: 0.7,
  direction: new Vector3(0, 1, 0),
};

export const PLAYER_SPOTS_POSITIONS: Vector3[] = [
  new Vector3(-0.56, 1.03, 0.4),
  new Vector3(-0.3, 1.03, 0.63),
  new Vector3(0, 1.03, 0.73),
  new Vector3(0.3, 1.03, 0.63),
  new Vector3(0.56, 1.03, 0.4),
];

export const PLAYER_SPOTS_ROTATION: Vector3[] = [
  new Vector3(0, -Math.PI / 2, 0),
  new Vector3(0, -Math.PI / 4, 0),
  new Vector3(0, 0, 0),
  new Vector3(0, Math.PI / 4, 0),
  new Vector3(0, Math.PI / 2, 0),
];

export const CHIPS_ARRAY: IChipProps[] = [
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

const CARDS_SPRITESHEET_WIDTH = 13;
const CARDS_SPRITESHEET_HEIGHT = 4;
export const CARD_SPRITE_WIDTH = 1 / CARDS_SPRITESHEET_WIDTH;
export const CARD_SPRITE_HEIGHT = 1 / CARDS_SPRITESHEET_HEIGHT;

// time in ms you need to wait for smoother animation
export const DEALING_ANIMATION_DURATION = 1700;
export const ENDING_ANIMATION_DURATION = 1400;

//time in ms you need to wait for auto restart
export const ROUND_RESTART_WAIT_TIME = 5000;

export const ROTATED_CARD_VECTOR: Vector3 = new Vector3(0, 0, Math.PI);
