import { useContext } from "react";

import { UsecasesContext } from "../../../common/UsecasesContext";
import {
  EmissionCategories,
  EmissionsByCategory,
} from "../../../domain/models/transport/car/EmissionCategories";

export const useProfile = () => {
  const { useFetchEmissionsByCategory } = useContext(UsecasesContext);

  const emissionsByCategory: EmissionsByCategory[] =
    useFetchEmissionsByCategory();

  const transportEmissions = emissionsByCategory.find(
    (emissions) => emissions.category === EmissionCategories.TRANSPORT,
  )!;

  return {
    transportEmissions,
  };
};
