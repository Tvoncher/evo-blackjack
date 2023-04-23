import { FC, useEffect } from "react";
import { MeshAssetTask } from "@babylonjs/core/Misc/assetsManager";
import { useAssetManager, useScene } from "react-babylonjs";
import { observer } from "mobx-react-lite";
import { assetsTask } from "../Cards/AssetManager";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { mainStore } from "../../../stores/MainStore";

//displaying room

export const Room: FC = observer(() => {
  const assetManagerResult = useAssetManager(assetsTask);
  useEffect(() => {
    const roomTask = assetManagerResult.taskNameMap["room"] as MeshAssetTask;

    const room: Mesh = roomTask.loadedMeshes[0] as Mesh;
    room.position = new Vector3(0, 0, 3);

    //TODO: WHY its rotating after scale
    room.scaling = new Vector3(3, 3, 3);
    room.rotation = new Vector3(0, 0, 0);

    mainStore.roomStore.setIsLoaded();
  });

  return null;
});
