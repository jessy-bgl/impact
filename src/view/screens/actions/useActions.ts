import { useContext, useEffect } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useFootprints } from "@view/view-models/useFootprints";

export const useActions = () => {
  const storedActions = useAppStore((store) => store.actions);
  const storedFootprints = useAppStore((store) => store.footprints);

  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  useEffect(() => {
    syncEngineWithStoredActions();
  }, [storedFootprints, syncEngineWithStoredActions]);

  const { footprints } = useFootprints();

  const notStartedActions = storedActions.filter(
    (action) => action.state === "notStarted",
  );

  const inProgressActions = storedActions.filter(
    (action) => action.state === "inProgress",
  );

  const skippedActions = storedActions.filter(
    (action) => action.state === "skipped",
  );

  return {
    notStartedActions,
    inProgressActions,
    skippedActions,
    updateActionState,
    footprints,
  };
};
