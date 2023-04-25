import { FC } from "react";
import PlayerSpot from "./PlayerSpot";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import {
  playerSpotsRotation,
  playerSpotsPositions,
} from "../../../utils/consts";

const PlayerSpotsHandler: FC = observer(() => {
  const playerSpots = mainStore.playerSpotsStore.playerSpots;

  return (
    <>
      {playerSpots.map((playerSpot) => (
        <PlayerSpot
          key={playerSpot.index}
          position={playerSpotsPositions[playerSpot.index]}
          rotation={playerSpotsRotation[playerSpot.index]}
          {...playerSpot}
        />
      ))}
    </>
  );
});

export default PlayerSpotsHandler;
