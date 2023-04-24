import { useEffect } from "react";
import { useAssetManager } from "react-babylonjs";
import { assetsTask } from "../components/assetsTask";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { MeshAssetTask } from "@babylonjs/core/Misc/assetsManager";

//handling greating animation on initial render
export const useGreetingAnimation = () => {
  //built-in hook for getting asset manager result
  const assetManagerResult = useAssetManager(assetsTask);

  useEffect(() => {
    const dealerTask = assetManagerResult.taskNameMap[
      "dealer"
    ] as MeshAssetTask;

    //you can access all animations using babylonjs sandbox or gltf viewer extension
    const animationGroups: AnimationGroup[] = dealerTask.loadedAnimationGroups;
    const animationGreeting = animationGroups[2];
    const animationDealing = animationGroups[0];

    //need to stop initial animation
    animationDealing.stop();
    animationGreeting.play();
  }, []);
};
