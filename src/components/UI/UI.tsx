import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { MainStoreContext } from "../../stores/MainStore";
import { RoomState } from "../../types/types";
import WinLossPopup from "./WinLossPopup/WinLossPopup";
import BalanceAndBet from "./BalanceAndBet/BalanceAndBet";

//handling all ui elements (except of babylon js based)
const UI: FC = observer(() => {
  const context = useContext(MainStoreContext);
  const roomState = context?.roomStore.roomState;
  return (
    <>
      <BalanceAndBet />
      {roomState === RoomState.ending && <WinLossPopup />}
    </>
  );
});

export default UI;
