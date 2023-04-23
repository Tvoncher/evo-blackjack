import { FC, useContext } from "react";
import "./WinLossPopup.css";
import { MainStoreContext } from "../../../stores/MainStore";

const WinLossPopup: FC = () => {
  const context = useContext(MainStoreContext);
  const win = true;
  const profit = 300;
  return (
    <div className="win-loss">
      <div className="win-loss__container">
        <h3 className="win-loss__title">{win ? "YOU WIN" : "LOSE"}</h3>
        <p className="text">${profit}</p>
      </div>
    </div>
  );
};

export default WinLossPopup;
