import { useContext, useMemo } from "react";

import { FootprintByCategory, Footprints } from "./Footprint";
import { UsecasesContext } from "../../common/UsecasesContext";
import { useAppStore } from "../../data/store/store";

export const useFootprints = () => {
  const appStore = useAppStore((store) => store);

  const {
    useFetchTransport,
    useFetchPublicServices,
    useComputeTotalAnnualFootprint,
  } = useContext(UsecasesContext);

  const { computeTotalAnnualFootprint } = useComputeTotalAnnualFootprint();
  const { fetchTransport } = useFetchTransport();
  const { fetchPublicServices } = useFetchPublicServices();

  const transport = useMemo(() => fetchTransport(), [appStore]);
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
      transport.annualFootprint,
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
