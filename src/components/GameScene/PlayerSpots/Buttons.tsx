import { FC, useCallback } from "react";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import { PlayerSpotStatus, RoomState } from "../../../types/types";
import { checkPoints, findActiveSpot } from "../../../utils/gameLogic";
import { recalculatePoints } from "../../../utils/utils";
import { Html, useScene } from "react-babylonjs";
import "./Buttons.css";

interface IButtonsProps {
  points: number;
  index: number;
  status: PlayerSpotStatus;
}

const Buttons: FC<IButtonsProps> = observer(({ points, status, index }) => {
  const roomState = mainStore.roomStore.roomState;
  const roomStore = mainStore.roomStore;

  const handleHit = useCallback(() => {
    const newCard = roomStore.takeCards(1);
    mainStore.playerSpotsStore.playerSpots[index].hand = [
      ...mainStore.playerSpotsStore.playerSpots[index].hand,
      ...newCard,
    ];
    recalculatePoints(index, false);

    checkPoints(index);
  }, [points]);

  const handleStand = useCallback(() => {
    //reseting status and calling awesome function to find next spot with bets
    mainStore.playerSpotsStore.setPlayerSpotStatus(
      index,
      PlayerSpotStatus.inactive
    );

    findActiveSpot();
  }, []);

  return (
    <>
      {roomState === RoomState.playing &&
        status === PlayerSpotStatus.active && (
          <Html name="buttons" center>
            <div className="ui-container">
              <div className="title text">
                <h3>MAKE YOUR DECISION</h3>
              </div>
              <div className="buttons-container">
                <div className="button-container" onClick={handleHit}>
                  <div className="button hit">
                    <p className="text">HIT</p>
                  </div>
                </div>
                <div className="button-container" onClick={handleStand}>
                  <div className="button stand">
                    <p className="text">STAND</p>
                  </div>
                </div>
              </div>
            </div>
          </Html>
        )}
    </>
  );
});

export default Buttons;
