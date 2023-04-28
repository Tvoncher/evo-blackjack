import { FC } from "react";
import "./GreetingScreen.css";
import { useAuth } from "../../hooks/useAuth";
import { GreetingProps } from "../../types/types";

// showing greeting screen and starting game
const GreetingScreen: FC<GreetingProps> = ({ setIsStarted }) => {
  const handleAuth = useAuth(setIsStarted);

  return (
    <div className="greeting">
      <img src="images/logo.png" alt="logo" />
      <button className="play-button" onClick={handleAuth}>
        Play
      </button>
    </div>
  );
};

export default GreetingScreen;
