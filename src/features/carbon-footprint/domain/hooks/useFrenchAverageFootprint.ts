/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from "react";

import { UsecasesContext } from "@common/context/UsecasesContext";

export const useFrenchAverageFootprint = (): number => {
  const { computeFrenchAverageFootprint } = useContext(UsecasesContext);

  // The SDES estimate does not depend on the engine's situation: computed once
  // on mount rather than on every render.
  return useMemo(() => computeFrenchAverageFootprint(), []);
};
