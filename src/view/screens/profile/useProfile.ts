import { FootprintCategories } from "@domain/entities/Categories";
import { useFootprints } from "@view/view-models/useFootprints";

export const useProfile = () => {
  const { footprints } = useFootprints();

  return {
    transportFootprint: footprints[FootprintCategories.TRANSPORT],
    housingFootprint: footprints[FootprintCategories.HOUSING],
    foodFootprint: footprints[FootprintCategories.FOOD],
    everydayThingsFootprint: footprints[FootprintCategories.EVERYDAY_THINGS],
    publicServicesFootprint: footprints[FootprintCategories.PUBLIC_SERVICES],
  };
};
