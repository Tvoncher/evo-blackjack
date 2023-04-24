import { Animation } from "@babylonjs/core/Animations";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

export const resetCameraAngles = (
  camera: ArcRotateCamera,
  initialRadius: number,
  initialAlpha: number,
  initialBeta: number
) => {
  Animation.CreateAndStartAnimation(
    "cameraAnim",
    camera,
    "radius",
    45,
    60,
    camera.radius,
    initialRadius,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  Animation.CreateAndStartAnimation(
    "cameraAnim",
    camera,
    "alpha",
    45,
    60,
    camera.alpha,
    initialAlpha,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  Animation.CreateAndStartAnimation(
    "cameraAnim",
    camera,
    "beta",
    45,
    60,
    camera.beta,
    initialBeta,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );
};
