import { FC, useCallback, useContext } from "react";
import "./Greeting.css";
import { MainStoreContext } from "../../stores/MainStore";

interface GreetingProps {
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Greeting: FC<GreetingProps> = ({ setIsGameStarted }) => {
  const context = useContext(MainStoreContext);
  const userStore = context?.userStore;

  const handleClick = useCallback(() => {
    userStore?.userAuth();

    setIsGameStarted(() => true);
  }, []);

  return (
    <div className="greeting">
      <img src="images/logo.png" alt="logo" />
      <button className="play-button" onClick={handleClick}>
        Play
      </button>
    </div>
  );
};

export default Greeting;
