/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from "react";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { mapFootprintCategories } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

export const useFootprints = () => {
  const storedFootprints = useAppStore((store) => store.footprints);

  const { computeAnnualFootprint } = useContext(UsecasesContext);

  const annualFootprint = useMemo(
    () => computeAnnualFootprint(storedFootprints),
    [storedFootprints],
  );

  const footprints = FootprintCategoryViewModel.forCategories(
    mapFootprintCategories(
      (category) => storedFootprints[category].annualFootprint,
    ),
    annualFootprint,
  );

  const isLoading = isNaN(annualFootprint);

  return { isLoading, footprints, annualFootprint };
};
