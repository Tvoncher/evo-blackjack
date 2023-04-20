import { useState } from "react";
import GameScene from "../GameScene/GameScene";
import Greeting from "../Greeting/Greeting";
import "./App.css";
import UI from "../UI/UI";
import { MainStoreContext, mainStore } from "../../stores/MainStore";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  return (
    <MainStoreContext.Provider value={mainStore}>
      <div className="app">
        {isGameStarted ? (
          <>
            <GameScene />
            <UI />
          </>
        ) : (
          <Greeting setIsGameStarted={setIsGameStarted} />
        )}
      </div>
    </MainStoreContext.Provider>
  );
}

export default App;
