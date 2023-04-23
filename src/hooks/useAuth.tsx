import { useCallback, useContext } from "react";
import { MainStoreContext } from "../stores/MainStore";

//loading / creating user
export const useAuth = (
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const context = useContext(MainStoreContext);
  const userStore = context?.userStore;

  const handleAuth = useCallback(() => {
    userStore?.userAuth();
    setIsStarted(() => true);
  }, []);

  return handleAuth;
};
