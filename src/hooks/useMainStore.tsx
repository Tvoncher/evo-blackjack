import { useContext } from "react";
import { MainStore, MainStoreContext } from "../stores/MainStore";

export const useMainStore = (): MainStore => {
  const context = useContext(MainStoreContext);
  if (!context) {
    throw new Error(`something wrong with main store context: ${context}`);
  }

  return context;
};
