import { FC } from "react";
import "./BalanceAndBet.css";
import { observer } from "mobx-react-lite";
import { useMainStore } from "../../../hooks/useMainStore";

const BalanceAndBet: FC = observer(() => {
  const { balance, totalBet } = useMainStore().userStore.user;
  return (
    <div className="balance_bet">
      <div className="balance_bet__frame">
        BALANCE <p className="balance_bet__text_golden"> {balance}</p>
      </div>
      <div className="balance_bet__frame">
        TOTAL BET <p className="balance_bet__text_golden">{totalBet}</p>
      </div>
    </div>
  );
});

export default BalanceAndBet;
