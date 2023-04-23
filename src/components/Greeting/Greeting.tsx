import { FC } from "react";
import "./Greeting.css";
import { useGameStart } from "../../hooks/useGameStart";

interface GreetingProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

// showing greeting screen and starting game
const Greeting: FC<GreetingProps> = ({ setIsStarted }) => {
  const handleGameStart = useGameStart(setIsStarted);

  return (
    <div className="greeting">
      <img src="images/logo.png" alt="logo" />
      <button className="play-button" onClick={handleGameStart}>
        Play
      </button>
    </div>
  );
};

export default Greeting;
