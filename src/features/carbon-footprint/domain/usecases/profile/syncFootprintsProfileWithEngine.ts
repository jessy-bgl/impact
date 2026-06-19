import { InteractionManager } from "react-native";

import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";

export const createSyncFootprintsProfileWithEngine = (
  computeEngine: ComputeEngine,
  profileRepository: ProfileRepository,
  footprintsRepository: FootprintsRepository,
) => {
  const syncFootprintsProfileWithEngine = async ({
    handleMigration = false,
  }: { handleMigration?: boolean } = {}): Promise<void> => {
    // Wait for interactions to complete before starting heavy computation
    await new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => resolve());
    });

    const storedProfile = profileRepository.fetchAdemeProfile();
    let profile = structuredClone(storedProfile);

    if (handleMigration) {
      profile = migrateProfile(profile);
      // Persist migrated profile if any keys were removed or changed
      for (const key of Object.keys(storedProfile) as (keyof Profile)[]) {
        if (!(key in profile)) {
          profileRepository.updateProfileKey(key, undefined);
        }
      }
    }

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

  /**
   * Validates the stored profile against the current engine rules.
   * When the engine is updated, question types or valid option values may change.
   * Any stored value that is no longer valid is removed so the engine default is used instead.
   */
  const migrateProfile = (profile: Profile): Profile => {
    const rules = AdemeEngine.getRules();
    const migratedProfile: Profile = {};

    for (const [key, value] of Object.entries(profile)) {
      const profileKey = key as keyof Profile;

      // Drop keys that no longer exist in the engine as a question
      const rule = rules[profileKey];
      if (!rule || !rule.rawNode.question) continue;

      // For select questions, validate that the stored value is still a valid option
      if (rule.rawNode["une possibilité"]) {
        const validOptions = (rule.rawNode["une possibilité"] as string[]).map(
          (option) => (option.startsWith("'") ? option : `'${option}'`),
        );
        if (!validOptions.includes(value as string)) continue;
      } else if (typeof value === "string") {
        // Question type changed from choice to numeric — string value is no longer valid
        continue;
      }

      migratedProfile[profileKey] = value;
    }

    return migratedProfile;
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
