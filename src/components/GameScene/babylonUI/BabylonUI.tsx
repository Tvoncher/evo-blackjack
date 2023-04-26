import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import { RoomState } from "../../../types/types";
import ChipsHandler from "./Chips/ChipsHandler";
import DealButton from "./DealButton";
import HitNStandButtons from "./HitNStandButtons/HitNStandButtons";

//handling all UI elements rendered by babylon
const BabylonUI: FC = observer(() => {
  const roomState = mainStore.roomStore.roomState;
  const totalBet = mainStore.userStore.user.totalBet;

  return (
    <>
      {roomState === RoomState.betting && <ChipsHandler />}
      {roomState === RoomState.playing && <HitNStandButtons />}
      {roomState === RoomState.betting && totalBet > 0 && <DealButton />}
    </>
  );
});

export default BabylonUI;
