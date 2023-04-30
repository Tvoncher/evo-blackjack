import { FC } from "react";
import { observer } from "mobx-react-lite";
import { RoomState } from "../../types/types";
import WinLossPopup from "./WinLossPopup/WinLossPopup";
import BalanceAndBet from "./BalanceAndBet/BalanceAndBet";
import { useMainStore } from "../../hooks/useMainStore";

 //handling all ui elements (except of babylonjs based cause of library limitations)
const UI: FC = observer(() => {
  const { roomState } = useMainStore().roomStore;
  return (
    <>
      <BalanceAndBet />
      {roomState === RoomState.ending && <WinLossPopup />}
    </>
  );
});

export default UI;
