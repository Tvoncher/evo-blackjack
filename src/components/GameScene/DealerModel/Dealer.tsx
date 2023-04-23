import { FC, useEffect, useState } from "react";
import { useAssetManager } from "react-babylonjs";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AnimationGroup, Color3, Mesh, MeshAssetTask } from "@babylonjs/core";
import { assetsTask } from "../Cards/AssetManager";
import { mainStore } from "../../../stores/MainStore";
import { RoomState } from "../../../types/types";

const Dealer: FC = ({}) => {
  const assetManagerResult = useAssetManager(assetsTask);

  const roomState = mainStore.roomStore.roomState;

  const [animationGroups, setAnimationGroups] = useState<
    AnimationGroup[] | null
  >(null);

  //TODO:custom hooks

  useEffect(() => {
    const dealerTask = assetManagerResult.taskNameMap[
      "dealer"
    ] as MeshAssetTask;

    const dealer: Mesh = dealerTask.loadedMeshes[0] as Mesh;
    dealer.position = new Vector3(0, 0, 1.5);

    //TODO: WHY its rotating after scale
    dealer.rotation = new Vector3(0, 0, 0);
    dealer.scaling = new Vector3(3, 3, 3);

    /*animationDealing.onAnimationGroupEndObservable.add(runIdleAnim);
      animationEnding.onAnimationGroupEndObservable.add(runIdleAnim);
      animationGreeting.onAnimationGroupEndObservable.add(runIdleAnim);
      animationGreeting.play(); */

    const animationGroups: AnimationGroup[] = dealerTask.loadedAnimationGroups;

    const animationDealing = animationGroups[0];
    animationDealing.stop();
    setAnimationGroups(() => animationGroups);
    const animationGreeting = animationGroups[2];
    animationGreeting.play();
  }, []);

  useEffect(() => {
    if (animationGroups) {
      const animationDealing = animationGroups[0];
      const animationEnding = animationGroups[1];
      const animationGreeting = animationGroups[2];
      const animationIdle = animationGroups[3];

      const runIdleAnim = () => {
        animationIdle.play();
      };

      animationDealing.onAnimationGroupEndObservable.add(runIdleAnim);
      animationEnding.onAnimationGroupEndObservable.add(runIdleAnim);
      animationGreeting.onAnimationGroupEndObservable.add(runIdleAnim);

      switch (roomState) {
        case RoomState.dealing:
          animationDealing.play();
          console.log("playind dealing anim");

          break;
        case RoomState.ending:
          animationEnding.play();
          console.log("playind ending anim");

          break;

        default:
          console.log("no animation groups for this state");
      }
    }
  }, [roomState, animationGroups]);

  return (
    <>
      {/*just a glowing part of table */}
      <box
        name="glowing-mesh"
        width={5}
        height={0.01}
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

export default Dealer;
