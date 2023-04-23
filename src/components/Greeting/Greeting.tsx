import { FC } from "react";
import "./Greeting.css";
import { useAuth } from "../../hooks/useAuth";

interface GreetingProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

// showing greeting screen and starting game
const Greeting: FC<GreetingProps> = ({ setIsStarted }) => {
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

export default Greeting;
