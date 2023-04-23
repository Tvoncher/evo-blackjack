import { useState } from "react";
import GameScene from "../GameScene/GameScene";
import Greeting from "../Greeting/Greeting";
import "./App.css";
import { MainStoreContext, mainStore } from "../../stores/MainStore";

function App() {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  return (
    <MainStoreContext.Provider value={mainStore}>
      <div className="app">
        {isStarted ? <GameScene /> : <Greeting setIsStarted={setIsStarted} />}
      </div>
    </MainStoreContext.Provider>
  );
}

export default App;
