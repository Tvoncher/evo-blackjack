import { FC, useContext } from "react";
import { MainStoreContext } from "../../stores/MainStore";

const WinLossPopup: FC = () => {
  const context = useContext(MainStoreContext);
  const win = true;
  const profit = 300;
  return (
    <div className="win-loss-container">
      <div className="bg-container">
        <h3 className="you-win">{win ? "YOU WIN" : "LOSE"}</h3>
        <p className="text">${profit}</p>
      </div>
    </div>
  );
};

export default WinLossPopup;
