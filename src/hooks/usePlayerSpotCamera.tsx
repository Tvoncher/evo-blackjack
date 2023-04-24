import { useScene } from "react-babylonjs";
import { PlayerSpotStatus } from "../types/types";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

export const usePlayerSpotCamera = (
  status: PlayerSpotStatus,
  rotationY: number
) => {
  const scene = useScene();
  if (status === PlayerSpotStatus.active && scene) {
    const camera = scene.cameras[0] as ArcRotateCamera;

    camera.alpha = Math.PI / 2 + Math.sin(-rotationY / 1.4);
    camera.beta = Math.PI / 2.8;
    camera.radius = 1.7;
  }
};
