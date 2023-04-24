import { FC, Ref, useRef } from "react";
import { baseCameraParams } from "../../../utils/consts";
import { mainStore } from "../../../stores/MainStore";
import { RoomState } from "../../../types/types";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { observer } from "mobx-react-lite";

const BaseCamera: FC = observer(() => {
  const { alpha, beta, radius, target, minZ } = baseCameraParams;
  const camera: Ref<ArcRotateCamera> | null = useRef(null);

  // reseting camera angles at the end
  const roomState = mainStore.roomStore.roomState;
  if (roomState === RoomState.ending) {
    if (camera.current) {
      camera.current.radius = radius;
      camera.current.alpha = alpha;
      camera.current.beta = beta;
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
      ref={camera}
    />
  );
});

export default BaseCamera;
