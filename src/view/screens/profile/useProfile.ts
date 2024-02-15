import { useFootprints } from "@view/view-models/useFootprints";

export const useProfile = () => {
  const { footprints } = useFootprints();

  return {
    transportFootprint: footprints["transport"],
    housingFootprint: footprints["housing"],
    foodFootprint: footprints["food"],
    everydayThingsFootprint: footprints["everydayThings"],
    publicServicesFootprint: footprints["publicServices"],
  };
};
