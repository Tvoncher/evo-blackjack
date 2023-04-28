import { FC } from "react";
import "./LoadingScreen.css";

/* looks exactly as greeting screen and seems like you can delete it
but you really need this structure for future improvements like
creating really goodlooking loading screen and changing greeting to real authorisation page */

const LoadingScreen: FC = () => {
  return (
    <div className="loader">
      <img className="loader__img" src="images/logo.png" alt="logo" />
      <button className="loader__button">Play</button>
    </div>
  );
};

export default LoadingScreen;
