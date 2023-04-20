import { FC, useCallback, useContext, useEffect } from "react";
import "./UI.css";
import { observer } from "mobx-react-lite";
import { MainStoreContext } from "../../stores/MainStore";
import { IUser } from "../../types/types";

const UI: FC = observer(() => {
  const context = useContext(MainStoreContext);
  const { balance, totalBet } = context?.userStore.user as IUser;

  return (
    <>
      <div className="UI-container">
        <div className="balance frame">
          BALANCE <h4>{balance}</h4>
        </div>
        <div className="totalBet frame">
          TOTAL BET <h4>{totalBet}</h4>
        </div>
      </div>
    </>
  );
});

export default UI;
