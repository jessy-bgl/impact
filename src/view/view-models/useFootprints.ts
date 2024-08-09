import { useContext, useMemo } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import {
  FootprintCategoryViewModel,
  Footprints,
} from "@view/view-models/Footprint";

export const useFootprints = () => {
  const appStore = useAppStore((store) => store);

  const {
    fetchTransportFootprint,
    computeAnnualFootprint,

    useFetchTransport,
    useFetchFood,
    useFetchHousing,
    useFetchEverydayThings,
    useFetchPublicServices,
    useComputeTotalAnnualFootprint,
  } = useContext(UsecasesContext);

  const { computeTotalAnnualFootprint } = useComputeTotalAnnualFootprint();
  const { fetchTransport } = useFetchTransport();
  const { fetchFood } = useFetchFood();
  const { fetchHousing } = useFetchHousing();
  const { fetchEverydayThings } = useFetchEverydayThings();
  const { fetchPublicServices } = useFetchPublicServices();

  // TODO: voir si on peut optimiser en spécifiant davantage les dépendances
  const transportFootprint = useMemo(
    () => fetchTransportFootprint(),
    [appStore],
  );
  const annualFootprint = useMemo(() => computeAnnualFootprint(), [appStore]);

  const transport = useMemo(() => fetchTransport(), [appStore]);
  const food = useMemo(() => fetchFood(), [appStore]);
  const housing = useMemo(() => fetchHousing(), [appStore]);
  const everydayThings = useMemo(() => fetchEverydayThings(), [appStore]);
  const publicServices = useMemo(() => fetchPublicServices(), [appStore]);
  const totalAnnualFootprint = useMemo(
    () => computeTotalAnnualFootprint(),
    [appStore],
  );

  const footprints: Footprints = {
    transport: FootprintCategoryViewModel.forTransport(
      transportFootprint.annualFootprint,
      annualFootprint,
    ),
    food: FootprintCategoryViewModel.forFood(
      food.annualFootprint,
      annualFootprint,
    ),
    housing: FootprintCategoryViewModel.forHousing(
      housing.annualFootprint,
      annualFootprint,
    ),
    everydayThings: FootprintCategoryViewModel.forEverydayThings(
      everydayThings.annualFootprint,
      annualFootprint,
    ),
    publicServices: FootprintCategoryViewModel.forPublicServices(
      publicServices.annualFootprint,
      annualFootprint,
    ),
  };

  return { footprints, annualFootprint };
};
