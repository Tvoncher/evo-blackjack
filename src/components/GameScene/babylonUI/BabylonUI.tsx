import { FC } from "react";
import { mainStore } from "../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import { RoomState } from "../../../types/types";
import ChipsHandler from "./Chips/ChipsHandler";
import DealButton from "./DealButton";

//handling all UI elements rendered by babylon
const BabylonUI: FC = observer(() => {
  const roomState = mainStore.roomStore.roomState;

  return (
    <>
      {roomState === RoomState.betting && <ChipsHandler />}
      <DealButton />
    </>
  );
});

export default BabylonUI;
