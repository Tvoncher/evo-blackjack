import { FC, useCallback } from "react";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { observer } from "mobx-react-lite";
import { Html } from "react-babylonjs";
import "./HitNStandButtons.css";
import { mainStore } from "../../../../stores/MainStore";
import { RoomState } from "../../../../types/types";
import {
  deactivatePlayerSpot,
  recalculatePoints,
} from "../../../../utils/utils";
import { checkPoints, findActiveSpot } from "../../../../utils/gameLogic";

interface IButtonsProps {
  index: number;
}

//handling hit/stand buttons
const HitNStandButtons: FC<IButtonsProps> = observer(({ index }) => {
  const roomState = mainStore.roomStore.roomState;
  const roomStore = mainStore.roomStore;
  const points = mainStore.playerSpotsStore.playerSpots[index].points;

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
    //reseting status and finding next spot with bets
    deactivatePlayerSpot(index);

    findActiveSpot();
  }, []);

  return (
    <>
      {roomState === RoomState.playing && (
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

export default HitNStandButtons;
