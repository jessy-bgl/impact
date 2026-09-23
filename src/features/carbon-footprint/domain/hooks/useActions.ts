import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";

import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

export const useActions = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  const hasAvailableAction = useAppStore((store) =>
    store.actions.some((action) => action.state === "notStarted"),
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    const syncActions = async () => {
      try {
        // Wrap the expensive synchronous operation in a promise
        // to allow the UI to remain responsive
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            syncEngineWithStoredActions();
            resolve();
          }, 0);
        });
      } finally {
        setIsLoading(false);
      }
    };

    syncActions();

    return () => setIsLoading(true);
  }, [syncEngineWithStoredActions, isFocused]);

  return { isLoading, hasAvailableAction, updateActionState };
};
