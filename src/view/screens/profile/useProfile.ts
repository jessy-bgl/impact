import { useContext } from "react";

import { UsecasesContext } from "../../../common/UsecasesContext";
import {
  FootprintCategories,
  Footprints,
} from "../../../domain/models/Footprint";

export const useProfile = () => {
  const { useFetchFootprints } = useContext(UsecasesContext);

  const footprints: Footprints = useFetchFootprints();

  return {
    transportFootprint: footprints[FootprintCategories.TRANSPORT],
  };
};
