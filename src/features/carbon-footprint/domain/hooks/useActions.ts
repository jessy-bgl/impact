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

  // The engine is not observable, but every change of its situation ends
  // with the footprints being stored (startup synchronization, answers): a
  // new footprints reference is the signal to synchronize the actions again.
  // The synchronization itself does nothing when the engine did not change.
  const footprints = useAppStore((store) => store.footprints);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    // Deferred: the synchronization is heavy and synchronous, the screen
    // renders first.
    const timeout = setTimeout(() => {
      syncEngineWithStoredActions();
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [syncEngineWithStoredActions, isFocused, footprints]);

  return { isLoading, hasAvailableAction, updateActionState };
};
