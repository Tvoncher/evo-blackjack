import { useCallback, useContext } from "react";
import { MainStoreContext } from "../stores/MainStore";

//loading / creating user
export const useGameStart = (
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const context = useContext(MainStoreContext);
  const userStore = context?.userStore;

  const handleGameStart = useCallback(() => {
    userStore?.userAuth();
    setIsStarted(() => true);
  }, []);

  return handleGameStart;
};
