import { useContext } from "react";

import { UsecasesContext } from "../../../common/UsecasesContext";
import {
  FootprintCategories,
  FootprintByCategory,
} from "../../../domain/models/transport/car/FootprintCategories";

export const useProfile = () => {
  const { useFetchFootprintByCategory } = useContext(UsecasesContext);

  const footprintByCategory: FootprintByCategory[] =
    useFetchFootprintByCategory();

  const transportFootprint = footprintByCategory.find(
    (footprint) => footprint.category === FootprintCategories.TRANSPORT,
  )!;

  return {
    transportFootprint,
  };
};
