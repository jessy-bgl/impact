import { FootprintCategories } from "@domain/models/Categories";
import { useFootprints } from "@view/view-models/useFootprints";

export const useProfile = () => {
  const { footprints } = useFootprints();

  return {
    transportFootprint: footprints[FootprintCategories.TRANSPORT],
    housingFootprint: footprints[FootprintCategories.HOUSING],
    foodFootprint: footprints[FootprintCategories.FOOD],
    goodsFootprint: footprints[FootprintCategories.GOODS],
    publicServicesFootprint: footprints[FootprintCategories.PUBLIC_SERVICES],
  };
};
