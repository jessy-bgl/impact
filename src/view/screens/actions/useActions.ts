import { useContext, useEffect, useState } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { ActionState } from "@domain/entities/actions/Action";
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

  const [actionStateToDisplay, setActionStateToDisplay] =
    useState<ActionState>("notStarted");

  const actionsToDisplay = !actionStateToDisplay
    ? storedActions
    : storedActions.filter((action) => action.state === actionStateToDisplay);

  return {
    actionsToDisplay,
    updateActionState,
    footprints,
    setActionStateToDisplay,
  };
};
