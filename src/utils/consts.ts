import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { IPlayerSpotsPositions } from "../types/types";

export const startingBalance: number = 1000;

export const playerSpotsPositions: IPlayerSpotsPositions = {
  0: new Vector3(-1.7, 3.1, 2.7),
  1: new Vector3(-1, 3.1, 3.4),
  2: new Vector3(0, 3.1, 3.7),
  3: new Vector3(1, 3.1, 3.4),
  4: new Vector3(1.7, 3.1, 2.7),
};
