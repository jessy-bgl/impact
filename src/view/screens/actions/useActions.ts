import _ from "lodash";
import { useContext, useEffect } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useFootprints } from "@view/view-models/useFootprints";

export const useActions = () => {
  // NB : the "uniqBy" method is a workaround used to remove
  // the temporerary duplicates from the array of actions
  const storedActions = _.uniqBy(
    useAppStore((store) => store.actions),
    "id",
  );

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
