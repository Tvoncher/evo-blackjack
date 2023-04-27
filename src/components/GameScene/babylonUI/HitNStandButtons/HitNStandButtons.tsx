import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { Html } from "react-babylonjs";
import "./HitNStandButtons.css";
import { mainStore } from "../../../../stores/MainStore";
import { checkPoints, findActiveSpot } from "../../../../utils/gameLogic";
import {
  deactivatePlayerSpot,
  dealCards,
  recalculatePoints,
} from "../../../../utils/buttons";

//handling hit/stand buttons
const HitNStandButtons: FC = observer(() => {
  const roomState = mainStore.roomStore.roomState;

  const handleHit = useCallback(() => {
    dealCards("player", 1);
    recalculatePoints(false);
    checkPoints();
  }, []);

  const handleStand = useCallback(() => {
    //reseting status and finding next spot with bets
    deactivatePlayerSpot();
    findActiveSpot();
  }, []);

  return (
    <Html name="buttons" center disposeInstanceOnUnmount>
      <div className="ui">
        <div className="title text">
          <h3>MAKE YOUR DECISION</h3>
        </div>
        <div className="buttons__container">
          <div className="button__container" onClick={handleHit}>
            <div className="button hit">
              <p className="text">HIT</p>
            </div>
          </div>
          <div className="button__container" onClick={handleStand}>
            <div className="button stand">
              <p className="text">STAND</p>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
});

export default HitNStandButtons;
