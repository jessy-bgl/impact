import _ from "lodash";
import { useContext, useEffect } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useFootprints } from "@view/view-models/useFootprints";

export const useActions = () => {
  // NB : the "uniqBy" method is a workaround used to remove
  // the temporary duplicates from the array of actions
  const storedActions = _.uniqBy(
    useAppStore((store) => store.actions),
    "id",
  );

  const { useUpdateActions, useUpdateActionState } =
    useContext(UsecasesContext);

  const { updateActions } = useUpdateActions();
  const { updateActionState } = useUpdateActionState();
  const { footprints } = useFootprints();

  const emissions = useAppStore((store) => store.emissions);

  useEffect(() => {
    updateActions();
  }, [emissions]);

  const actionsToDisplay = storedActions.filter(
    (action) => action.isApplicable && action.savedFootprint > 0,
  );

  const notStartedActions = actionsToDisplay.filter(
    (action) => action.state === "notStarted",
  );

  const inProgressActions = actionsToDisplay.filter(
    (action) => action.state === "inProgress",
  );

  const completedActions = actionsToDisplay.filter(
    (action) => action.state === "completed",
  );

  const skippedActions = actionsToDisplay.filter(
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
