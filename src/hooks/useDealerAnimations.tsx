import { useEffect } from "react";
import { useAssetManager } from "react-babylonjs";
import { assetsTask } from "../components/assetsTask";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { MeshAssetTask } from "@babylonjs/core/Misc/assetsManager";
import { mainStore } from "../stores/MainStore";
import { runAnim } from "../utils/utils";
import { RoomState } from "../types/types";
import { ROUND_RESTART_WAIT_TIME } from "../utils/consts";

//handling dealer animations
export const useDealerAnimations = () => {
  //built-in hook for getting asset manager result
  const assetManagerResult = useAssetManager(assetsTask);
  const roomState = mainStore.roomStore.roomState;

  useEffect(() => {
    const dealerTask = assetManagerResult.taskNameMap[
      "dealer"
    ] as MeshAssetTask;

    //you can access all animations using babylonjs sandbox or gltf viewer extension
    const animationGroups: AnimationGroup[] = dealerTask.loadedAnimationGroups;

    const animationDealing = animationGroups[0];
    const animationEnding = animationGroups[1];
    const animationGreeting = animationGroups[2];
    const animationIdle = animationGroups[3];

    animationIdle.loopAnimation = true;

    // running idle animation every time other animation ends
    animationDealing.onAnimationGroupEndObservable.add(() =>
      runAnim(animationIdle)
    );
    animationEnding.onAnimationGroupEndObservable.add(() =>
      runAnim(animationIdle)
    );
    animationGreeting.onAnimationGroupEndObservable.add(() =>
      runAnim(animationIdle)
    );

    //switching animations according to game state
    switch (roomState) {
      case RoomState.dealing:
        animationDealing.play();
        break;
      case RoomState.ending:
        //need some time to look at cards
        setTimeout(() => {
          animationEnding.play();
        }, ROUND_RESTART_WAIT_TIME);
        break;
    }
  }, [roomState, assetManagerResult.taskNameMap]);
};
