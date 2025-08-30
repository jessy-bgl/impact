/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from "react";

import {
  FootprintCategoryViewModel,
  FootprintViewModels,
} from "@carbonFootprint/domain/entities/FootprintViewModel";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

export const useFootprints = () => {
  const storedFootprints = useAppStore((store) => store.footprints);

  const { computeAnnualFootprint } = useContext(UsecasesContext);

  const annualFootprint = useMemo(
    () => computeAnnualFootprint(storedFootprints),
    [storedFootprints],
  );

  let footprints: FootprintViewModels = {
    transport: FootprintCategoryViewModel.forTransport(
      storedFootprints.transport.annualFootprint,
      annualFootprint,
    ),
    food: FootprintCategoryViewModel.forFood(
      storedFootprints.food.annualFootprint,
      annualFootprint,
    ),
    housing: FootprintCategoryViewModel.forHousing(
      storedFootprints.housing.annualFootprint,
      annualFootprint,
    ),
    everydayThings: FootprintCategoryViewModel.forEverydayThings(
      storedFootprints.everydayThings.annualFootprint,
      annualFootprint,
    ),
    societalServices: FootprintCategoryViewModel.forSocietalServices(
      storedFootprints.societalServices.annualFootprint,
      annualFootprint,
    ),
  };

  footprints = FootprintCategoryViewModel.distributeParts(footprints);

  const isLoading = isNaN(annualFootprint);

  return { isLoading, footprints, annualFootprint };
};
