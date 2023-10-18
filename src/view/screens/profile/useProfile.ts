import { FootprintCategories } from "../../../domain/models/Categories";
import { useFootprints } from "../../view-models/useFootprints";

export const useProfile = () => {
  const { footprints } = useFootprints();

  return {
    transportFootprint: footprints[FootprintCategories.TRANSPORT],
  };
};
