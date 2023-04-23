import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FC, Suspense, useContext, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import "./GameScene.css";
import { startGame } from "../../utils/gameLogic";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CardsHandler } from "./Cards/CardsHandler";
import { MainStoreContext, mainStore } from "../../stores/MainStore";
import { observer } from "mobx-react-lite";
import DealButton from "../UI/GameControls/DealButton";
import PlayerSpots from "./PlayerSpots/PlayerSpots";
import { Room } from "./Room/Room";
import Dealer from "./DealerModel/Dealer";
import UI from "../UI/UI";

// handling everything connected with babylonjs
const GameScene: FC = observer(() => {
  const context = useContext(MainStoreContext);
  const isLoading = mainStore.roomStore.isLoading;

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <UI />
      {isLoading && <LoadingScreen />}
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
          {/*MUST use suspense with react-babylon */}
          <Suspense>
            <Dealer />
            <Room />
            <CardsHandler />
            <DealButton />
            <PlayerSpots />
          </Suspense>
        </Scene>
      </Engine>
    </>
  );
});

export default GameScene;
