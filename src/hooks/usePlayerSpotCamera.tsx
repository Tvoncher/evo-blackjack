import { useScene } from "react-babylonjs";
import { PlayerSpotStatus } from "../types/types";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Animation } from "@babylonjs/core/Animations";
import { BASE_CAMERA_PARAMS } from "../utils/consts";

export const usePlayerSpotCamera = (
  status: PlayerSpotStatus,
  rotationY: number
) => {
  const scene = useScene();
  if (status === PlayerSpotStatus.active && scene) {
    const camera = scene.cameras[0] as ArcRotateCamera;
    Animation.CreateAndStartAnimation(
      "cameraAnim",
      camera,
      "alpha",
      45,
      60,
      camera.alpha,
      BASE_CAMERA_PARAMS.alpha + Math.sin(-rotationY / 1.4),
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    Animation.CreateAndStartAnimation(
      "cameraAnim",
      camera,
      "beta",
      45,
      60,
      camera.beta,
      Math.PI / 2.8,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    Animation.CreateAndStartAnimation(
      "cameraAnim",
      camera,
      "radius",
      45,
      60,
      camera.radius,
      1.7,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
  }
};
