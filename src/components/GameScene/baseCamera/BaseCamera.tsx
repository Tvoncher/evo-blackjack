import { FC } from "react";
import { baseCameraParams } from "../../../utils/consts";

const BaseCamera: FC = () => {
  const { alpha, beta, radius, target, minZ } = baseCameraParams;
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
};

export default BaseCamera;
