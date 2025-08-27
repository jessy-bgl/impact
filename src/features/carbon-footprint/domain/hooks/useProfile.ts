import { useAppStore } from "@carbonFootprint/data/store/store";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";

export const useProfile = () => {
  const { footprints } = useFootprints();

  const profileCompletion = useAppStore((store) => store.profile.completion);

  return {
    profileCompletion,
    transportFootprint: footprints["transport"],
    housingFootprint: footprints["housing"],
    foodFootprint: footprints["food"],
    everydayThingsFootprint: footprints["everydayThings"],
    societalServicesFootprint: footprints["societalServices"],
  };
};
