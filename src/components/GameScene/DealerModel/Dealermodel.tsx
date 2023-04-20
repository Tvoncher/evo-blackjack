import { FC, Suspense } from "react";
import { Model } from "react-babylonjs";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core";

type DealerModelProps = {};

const DealerModel: FC<DealerModelProps> = ({}) => {
  return (
    <>
      <Model
        name="dealer"
        rootUrl={`models/`}
        sceneFilename={`dealer.glb`}
        scaling={new Vector3(3, 3, 3)}
        position={new Vector3(0, 0, 1.5)}
      />
      {/*just a glowing part of table */}
      <box
        name="glowing-mesh"
        width={5}
        height={0.005}
        depth={0.005}
        position={new Vector3(0, 3.15, 2.1)}
      >
        <standardMaterial
          name="glowing-material"
          emissiveColor={new Color3(0, 0.7, 1)}
        />
      </box>
      <pointLight
        name="floor-light"
        position={new Vector3(0, 1.8, 5)}
        diffuse={new Color3(0, 0.7, 1)}
        intensity={5}
      />
    </>
  );
};

export default DealerModel;
