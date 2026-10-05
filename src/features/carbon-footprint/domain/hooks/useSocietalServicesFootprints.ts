import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useAppStore } from "@common/store/useStore";

/** The societal services footprint, split into public and merchant services. */
export const useSocietalServicesFootprints = () => {
  const societalServicesFootprint = useAppStore(
    (store) => store.footprints.societalServices,
  );

  const { publicServices, merchantServices, totalFootprint } =
    FootprintCategoryViewModel.forSocietalServices(societalServicesFootprint);

  const isLoading = isNaN(totalFootprint);

  return { isLoading, publicServices, merchantServices, totalFootprint };
};
