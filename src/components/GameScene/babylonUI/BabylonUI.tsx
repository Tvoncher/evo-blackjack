import { FC } from "react";
import { observer } from "mobx-react-lite";
import { RoomState } from "../../../types/types";
import ChipsHandler from "./Chips/ChipsHandler";
import DealButton from "./DealButton";
import HitNStandButtons from "./HitNStandButtons/HitNStandButtons";
import { useMainStore } from "../../../hooks/useMainStore";

//handling all UI elements rendered by babylon
const BabylonUI: FC = observer(() => {
  const { roomState } = useMainStore().roomStore;
  const { totalBet } = useMainStore().userStore.user;

  return (
    <>
      {roomState === RoomState.betting && <ChipsHandler />}
      {roomState === RoomState.playing && <HitNStandButtons />}
      {roomState === RoomState.betting && totalBet > 0 && <DealButton />}
    </>
  );
});

export default BabylonUI;
