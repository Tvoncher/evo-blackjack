import { FC } from "react";
import PlayerSpot from "./PlayerSpot";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";

//nahdling playerSpots
const PlayerSpots: FC = observer(() => {
  const playerSpots = mainStore.playerSpotsStore.playerSpots;

  return (
    <>
      {playerSpots.map((playerSpot) => (
        <PlayerSpot key={playerSpot.index} {...playerSpot} />
      ))}
    </>
  );
});

export default PlayerSpots;
