import { FC } from "react";
import "./LoadingScreen.css";

const LoadingScreen: FC = () => {
  return (
    <div className="loader-container">
      <img className="fading-img" src="images/logo.png" alt="logo" />
      <button className="loading-play-button">Play</button>
    </div>
  );
};

export default LoadingScreen;
