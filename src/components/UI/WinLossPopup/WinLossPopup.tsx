import { FC } from "react";
import "./WinLossPopup.css";
import { useMainStore } from "../../../hooks/useMainStore";

const WinLossPopup: FC = () => {
  const { totalWin } = useMainStore().userStore;

  return (
    <div className="win-loss">
      <div className="win-loss__container">
        <h3 className="win-loss__title">
          {totalWin >= 0 ? "YOU WIN" : "YOU LOSE"}
        </h3>
        <p className="text">${Math.abs(totalWin)}</p>
      </div>
    </div>
  );
};

export default WinLossPopup;
