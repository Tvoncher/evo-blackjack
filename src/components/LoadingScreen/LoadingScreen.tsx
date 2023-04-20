import { FC } from "react";
import "./LoadingScreen.css";

const LoadingScreen: FC = () => {
  return (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingScreen;
