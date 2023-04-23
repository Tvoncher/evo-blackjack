import { FC, Suspense, useContext, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import "./GameScene.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CardsHandler } from "./Cards/CardsHandler";
import { MainStoreContext } from "../../stores/MainStore";
import { observer } from "mobx-react-lite";
import DealButton from "./babylonUI/DealButton";
import PlayerSpots from "./PlayerSpots/PlayerSpots";
import { Room } from "./Room/Room";
import Dealer from "./DealerModel/Dealer";
import UI from "../UI/UI";
import { baseCameraParams, baseLightParams } from "../../utils/consts";
import { startGame } from "../../utils/utils";
import DealerSpot from "./DealerSpot/DealerSpot";

// handling everything connected with babylonjs
const GameScene: FC = observer(() => {
  const context = useContext(MainStoreContext);
  const isLoading = context?.roomStore.isLoading;

  const { alpha, beta, radius, target } = baseCameraParams;
  const { intensity, direction } = baseLightParams;

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
            target={target}
            alpha={alpha}
            beta={beta}
            radius={radius}
          />
          <hemisphericLight
            name="light1"
            intensity={intensity}
            direction={direction}
          />
          {/*MUST use suspense with react-babylon */}
          <Suspense>
            <Dealer />
            <Room />
            <CardsHandler />
            <DealButton />
            <PlayerSpots />
            <DealerSpot />
          </Suspense>
        </Scene>
      </Engine>
    </>
  );
});

export default GameScene;
