import { useContext, useEffect } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useFootprints } from "@view/view-models/useFootprints";

export const useActions = () => {
  const storedActions = useAppStore((store) => store.actions);

  const { useUpdateActions, useUpdateActionState } =
    useContext(UsecasesContext);

  const { updateActions } = useUpdateActions();
  const { updateActionState } = useUpdateActionState();
  const { footprints } = useFootprints();

  useEffect(() => {
    updateActions();
  }, []);

  const notStartedActions = storedActions.filter(
    (action) => action.state === "notStarted",
  );

  const inProgressActions = storedActions.filter(
    (action) => action.state === "inProgress",
  );

  const completedActions = storedActions.filter(
    (action) => action.state === "completed",
  );

  const skippedActions = storedActions.filter(
    (action) => action.state === "skipped",
  );

  return {
    notStartedActions,
    inProgressActions,
    completedActions,
    skippedActions,
    updateActionState,
    footprints,
  };
};
