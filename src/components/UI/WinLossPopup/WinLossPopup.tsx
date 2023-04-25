import { FC } from "react";
import "./WinLossPopup.css";
import { mainStore } from "../../../stores/MainStore";

const WinLossPopup: FC = () => {
  const totalWin = mainStore.userStore.totalWin;

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
