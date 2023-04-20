import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FC, Suspense, useContext, useEffect } from "react";
import { Engine, Html, Scene } from "react-babylonjs";
import "./GameScene.css";
import DealerModel from "./DealerModel/Dealermodel";
import { startGame } from "../../utils/gameLogic";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CardsHandler } from "./Cards/CardsHandler";
import { MainStoreContext, mainStore } from "../../stores/MainStore";
import { observer } from "mobx-react-lite";
import GameControls from "../UI/GameControls/GameControls";
import PlayerSpots from "./PlayerSpots/PlayerSpots";

// everything connected with babylonjs rendering
const GameScene: FC = observer(() => {
  const context = useContext(MainStoreContext);

  const roomState = context?.roomStore.roomState;

  useEffect(() => {
    startGame();
  }, []);

  return (
    <Engine antialias adaptToDeviceRatio className="canvas">
      <Scene>
        <arcRotateCamera
          name="camera1"
          target={new Vector3(0, 2, 0)}
          alpha={Math.PI / 2}
          beta={Math.PI / 2.8}
          radius={7}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={new Vector3(0, 1, 0)}
        />
        {/*TODO:create custom fallback */}
        <Suspense
          fallback={
            <Html name="html" fullscreen occlude={false}>
              {<LoadingScreen />}
            </Html>
          }
        >
          <DealerModel />
          <CardsHandler />
          <GameControls />
          <PlayerSpots />
        </Suspense>
      </Scene>
    </Engine>
  );
});

export default GameScene;
