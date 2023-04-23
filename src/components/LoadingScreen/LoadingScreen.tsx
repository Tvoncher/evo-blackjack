import { FC } from "react";
import "./LoadingScreen.css";

const LoadingScreen: FC = () => {
  return (
    <div className="loader">
      <img className="loader__img" src="images/logo.png" alt="logo" />
      <button className="loader__button">Play</button>
    </div>
  );
};

export default LoadingScreen;
