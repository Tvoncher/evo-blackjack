import { FC } from "react";
import PlayerSpot from "./PlayerSpot";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import {
  PLAYER_SPOTS_ROTATION,
  PLAYER_SPOTS_POSITIONS,
} from "../../../utils/consts";

//receiving array of all spots and creating spot meshes for each
const PlayerSpotsHandler: FC = observer(() => {
  const playerSpots = mainStore.playerSpotsStore.playerSpots;

  return (
    <>
      {playerSpots.map((playerSpot) => (
        <PlayerSpot
          key={playerSpot.index}
          position={PLAYER_SPOTS_POSITIONS[playerSpot.index]}
          rotation={PLAYER_SPOTS_ROTATION[playerSpot.index]}
          {...playerSpot}
        />
      ))}
    </>
  );
});

export default PlayerSpotsHandler;
