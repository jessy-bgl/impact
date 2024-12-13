import { useContext, useEffect } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useFootprints } from "@view/view-models/useFootprints";

export const useActions = () => {
  const storedFootprints = useAppStore((store) => store.footprints);

  const { syncEngineWithStoredActions, updateActionState } =
    useContext(UsecasesContext);

  useEffect(() => {
    syncEngineWithStoredActions();
  }, [storedFootprints, syncEngineWithStoredActions]);

  const { footprints } = useFootprints();

  return {
    updateActionState,
    footprints,
  };
};
