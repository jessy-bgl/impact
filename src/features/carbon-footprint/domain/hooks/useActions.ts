import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";

import { UsecasesContext } from "@common/context/UsecasesContext";

export const useActions = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    setTimeout(() => syncEngineWithStoredActions(), 0);
    setIsLoading(false);
    return () => setIsLoading(true);
  }, [syncEngineWithStoredActions, isFocused]);

  return { isLoading, updateActionState };
};
