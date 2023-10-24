import { useContext, useMemo } from "react";

import { FootprintByCategory, Footprints } from "./Footprint";
import { UsecasesContext } from "../../common/UsecasesContext";
import { useAppStore } from "../../data/store/store";
import { FootprintCategories } from "../../domain/models/Categories";

export const useFootprints = () => {
  const appStore = useAppStore((store) => store);

  const { useFetchTransport, useComputeTotalAnnualFootprint } =
    useContext(UsecasesContext);

  const { computeTotalAnnualFootprint } = useComputeTotalAnnualFootprint();
  const { fetchTransport } = useFetchTransport();

  const transport = useMemo(() => fetchTransport(), [appStore]);

  const totalAnnualFootprint = useMemo(
    () => computeTotalAnnualFootprint(),
    [appStore],
  );

  const footprints: Footprints = {
    transport: new FootprintByCategory(
      FootprintCategories.TRANSPORT,
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    food: new FootprintByCategory(
      FootprintCategories.FOOD,
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    goods: new FootprintByCategory(
      FootprintCategories.GOODS,
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    housing: new FootprintByCategory(
      FootprintCategories.HOUSING,
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
    publicServices: new FootprintByCategory(
      FootprintCategories.PUBLIC_SERVICES,
      transport.annualFootprint,
      totalAnnualFootprint,
    ),
  };

  return { footprints, totalAnnualFootprint };
};
