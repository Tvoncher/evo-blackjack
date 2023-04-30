import { FC } from "react";
import {
  BASE_CAMERA_PARAMS,
  ROUND_RESTART_WAIT_TIME,
} from "../../../utils/consts";
import { RoomState } from "../../../types/types";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { observer } from "mobx-react-lite";
import { useScene } from "react-babylonjs";
import { resetCameraAngles } from "../../../utils/BaseCamera";
import { useMainStore } from "../../../hooks/useMainStore";

//base (and only right now) camera config
const BaseCamera: FC = observer(() => {
  const { alpha, beta, radius, target, minZ } = BASE_CAMERA_PARAMS;
  const { roomState } = useMainStore().roomStore;

  const scene = useScene();
  const camera = scene!.cameras[0] as ArcRotateCamera;
  //disabling users ability to rotate cam angles
  if (camera) {
    camera.inputs.clear();
  }

  //moving back to initial angles
  if (roomState === RoomState.ending) {
    if (camera) {
      setTimeout(() => {
        resetCameraAngles(camera, radius, alpha, beta);
      }, ROUND_RESTART_WAIT_TIME);
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
