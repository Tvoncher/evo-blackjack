import { FC } from "react";
import { baseCameraParams } from "../../../utils/consts";
import { mainStore } from "../../../stores/MainStore";
import { RoomState } from "../../../types/types";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { observer } from "mobx-react-lite";
import { useScene } from "react-babylonjs";
import { resetCameraAngles } from "../../../utils/BaseCamera";

const BaseCamera: FC = observer(() => {
  const { alpha, beta, radius, target, minZ } = baseCameraParams;

  const roomState = mainStore.roomStore.roomState;
  const scene = useScene();
  const camera = scene!.cameras[0] as ArcRotateCamera;

  //moving back to initial angles
  if (roomState === RoomState.ending) {
    if (camera) {
      resetCameraAngles(camera, radius, alpha, beta);
    }
  }

  return (
    <arcRotateCamera
      name="camera1"
      target={target}
      alpha={alpha}
      beta={beta}
      radius={radius}
      minZ={minZ}
    />
  );
});

export default BaseCamera;
