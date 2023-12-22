import { useContext, useMemo } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Footprints, FootprintByCategory } from "@view/view-models/Footprint";

export const useFootprints = () => {
  const appStore = useAppStore((store) => store);

  const {
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
    transport: FootprintByCategory.forTransport(
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    food: FootprintByCategory.forFood(
      food.annualFootprint,
      totalAnnualFootprint,
    ),
    housing: FootprintByCategory.forHousing(
      housing.annualFootprint,
      totalAnnualFootprint,
    ),
    everydayThings: FootprintByCategory.forEverydayThings(
      everydayThings.annualFootprint,
      totalAnnualFootprint,
    ),
    publicServices: FootprintByCategory.forPublicServices(
      publicServices.annualFootprint,
      totalAnnualFootprint,
    ),
  };

  return { footprints, totalAnnualFootprint };
};
