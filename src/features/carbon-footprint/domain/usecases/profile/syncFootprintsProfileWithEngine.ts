import { InteractionManager } from "react-native";

import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";

export const createSyncFootprintsProfileWithEngine = (
  computeEngine: ComputeEngine,
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
) => {
  const syncFootprintsProfileWithEngine = async (): Promise<void> => {
    // Wait for interactions to complete before starting heavy computation
    await new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => resolve());
    });

    const profile = profileRepository.fetchAdemeProfile();
    computeEngine.setProfile(profile);

    const footprints = {
      transport: await computeWithDelay(() =>
        computeEngine.computeTransportFootprint(),
      ),
      food: await computeWithDelay(() => computeEngine.computeFoodFootprint()),
      housing: await computeWithDelay(() =>
        computeEngine.computeHousingFootprint(),
      ),
      everydayThings: await computeWithDelay(() =>
        computeEngine.computeEverydayThingsFootprint(),
      ),
      societalServices: await computeWithDelay(() =>
        computeEngine.computeSocietalServicesFootprint(),
      ),
    };

    updateStoredFootprints(footprints);
  };

  const computeWithDelay = <T>(computation: () => T): Promise<T> => {
    return new Promise((resolve) => {
      // Allow other tasks to run before each computation
      setTimeout(() => {
        const result = computation();
        resolve(result);
      }, 0);
    });
  };

  const updateStoredFootprints = (
    footprints: ReturnType<typeof computeEngine.computeFootprints>,
  ) => {
    footprintsRepository.updateTransportFootprint(footprints.transport);
    footprintsRepository.updateFoodFootprint(footprints.food);
    footprintsRepository.updateHousingFootprint(footprints.housing);
    footprintsRepository.updateEverydayThingsFootprint(
      footprints.everydayThings,
    );
    footprintsRepository.updateSocietalServicesFootprint(
      footprints.societalServices,
    );
  };

  return { syncFootprintsProfileWithEngine };
};
