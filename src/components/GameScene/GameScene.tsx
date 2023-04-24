import { FC, Suspense, useContext, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import "./GameScene.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CardsHandler } from "./Cards/CardsHandler";
import { MainStoreContext } from "../../stores/MainStore";
import { observer } from "mobx-react-lite";
import PlayerSpotsHandler from "./PlayerSpots/PlayerSpotsHandler";
import Dealer from "./Dealer/Dealer";
import UI from "../UI/UI";
import { baseLightParams } from "../../utils/consts";
import { startGame } from "../../utils/utils";
import DealerSpot from "./DealerSpot/DealerSpot";
import BaseCamera from "./baseCamera/BaseCamera";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import BabylonUI from "./BabylonUI/BabylonUI";

// handling everything connected with babylonjs
const GameScene: FC = observer(() => {
  const context = useContext(MainStoreContext);
  const isLoading = context?.roomStore.isLoading;

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
          <BaseCamera />
          <hemisphericLight
            name="light__main"
            intensity={intensity}
            direction={direction}
          />
          {/*must use suspense with react-babylon */}
          <Suspense>
            <Dealer />
            <BabylonUI />
            <CardsHandler />
            <PlayerSpotsHandler />
            <DealerSpot />
          </Suspense>
        </Scene>
      </Engine>
    </>
  );
});

export default GameScene;
