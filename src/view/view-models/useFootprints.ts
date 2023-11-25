import { useContext, useMemo } from "react";

import { FootprintByCategory, Footprints } from "./Footprint";
import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";

export const useFootprints = () => {
  const appStore = useAppStore((store) => store);

  const {
    useFetchTransport,
    useFetchFood,
    useFetchPublicServices,
    useComputeTotalAnnualFootprint,
  } = useContext(UsecasesContext);

  const { computeTotalAnnualFootprint } = useComputeTotalAnnualFootprint();
  const { fetchTransport } = useFetchTransport();
  const { fetchFood } = useFetchFood();
  const { fetchPublicServices } = useFetchPublicServices();

  const transport = useMemo(() => fetchTransport(), [appStore]);
  const food = useMemo(() => fetchFood(), [appStore]);
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
    goods: FootprintByCategory.forGoods(
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    housing: FootprintByCategory.forHousing(
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    publicServices: FootprintByCategory.forPublicServices(
      publicServices.annualFootprint,
      totalAnnualFootprint,
    ),
  };

  return { footprints, totalAnnualFootprint };
};
