import { FC, useEffect, useState } from "react";
import { useAssetManager } from "react-babylonjs";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AnimationGroup, Color3, Mesh, MeshAssetTask } from "@babylonjs/core";
import { assetsTask } from "../../assetsTask";
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

  // hiding loading screen
  useEffect(() => {
    mainStore.roomStore.setIsLoaded();
  });

  return (
    <>
      {/*just a glowing part of table */}
      <box
        name="glowing-mesh"
        width={1.7}
        height={0.005}
        depth={0.005}
        position={new Vector3(0, 1.05, 0.2)}
      >
        <standardMaterial
          name="glowing-material"
          emissiveColor={new Color3(0, 0.7, 1)}
        />
      </box>
      <pointLight
        name="floor-light"
        position={new Vector3(0, 0.8, 1)}
        diffuse={new Color3(0, 0.2, 1.5)}
      />
    </>
  );
};

export default Dealer;
