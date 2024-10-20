/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import {
  FootprintCategoryViewModel,
  Footprints,
} from "@view/view-models/Footprint";

export const useFootprints = () => {
  const storedFootprints = useAppStore((store) => store.footprints);

  const {
    fetchTransportFootprint,
    fetchEverydayThingsFootprint,
    fetchFoodFootprint,
    fetchHousingFootprint,
    fetchSocietalServicesFootprint,
    computeAnnualFootprint,
  } = useContext(UsecasesContext);

  const transportFootprint = useMemo(
    () => fetchTransportFootprint(),
    [storedFootprints.transport],
  );

  const foodFootprint = useMemo(
    () => fetchFoodFootprint(),
    [storedFootprints.food],
  );

  const housingFootprint = useMemo(
    () => fetchHousingFootprint(),
    [storedFootprints.housing],
  );

  const everydayThingsFootprint = useMemo(
    () => fetchEverydayThingsFootprint(),
    [storedFootprints.everydayThings],
  );

  const societalServices = useMemo(
    () => fetchSocietalServicesFootprint(),
    [storedFootprints.societalServices],
  );

  const annualFootprint = useMemo(
    () => computeAnnualFootprint(),
    [storedFootprints],
  );

  const footprints: Footprints = {
    transport: FootprintCategoryViewModel.forTransport(
      transportFootprint.annualFootprint,
      annualFootprint,
    ),
    food: FootprintCategoryViewModel.forFood(
      foodFootprint.annualFootprint,
      annualFootprint,
    ),
    housing: FootprintCategoryViewModel.forHousing(
      housingFootprint.annualFootprint,
      annualFootprint,
    ),
    everydayThings: FootprintCategoryViewModel.forEverydayThings(
      everydayThingsFootprint.annualFootprint,
      annualFootprint,
    ),
    societalServices: FootprintCategoryViewModel.forSocietalServices(
      societalServices.annualFootprint,
      annualFootprint,
    ),
  };

  FootprintCategoryViewModel.distributeParts(footprints);

  return { footprints, annualFootprint };
};
