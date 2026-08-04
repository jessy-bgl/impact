import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import {
  computeProfileSectionVersion,
  profileSections,
} from "@carbonFootprint/domain/entities/profile/profileSections";
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
    // Wait for the UI to go idle before starting heavy computation
    await waitForIdle();

    const storedProfile = profileRepository.fetchAdemeProfile();
    let profile = structuredClone(storedProfile);

    if (handleMigration) {
      profile = migrateProfile(profile);
      for (const key of Object.keys(storedProfile) as (keyof Profile)[]) {
        if (!(key in profile)) {
          profileRepository.updateProfileKey(key, undefined);
        }
      }
      resetCompletionForChangedSections(profile);
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

  const resetCompletionForChangedSections = (
    migratedProfile: Profile,
  ): void => {
    for (const section of Object.values(profileSections)) {
      const currentVersion = computeProfileSectionVersion(section.questionKeys);
      const storedVersion = profileRepository.fetchProfileCompletionVersion(
        section.category,
        section.subCategory,
      );

      let shouldReset: boolean;

      if (storedVersion === undefined) {
        // No version stored (user from before version tracking was added) —
        // reset only if no answers exist for any of the section's current keys
        const currentKeys = Object.values(
          section.questionKeys,
        ) as (keyof Profile)[];
        shouldReset = !currentKeys.some((key) => key in migratedProfile);
      } else {
        shouldReset = storedVersion !== currentVersion;
      }

      if (shouldReset) {
        profileRepository.updateProfileCompletion(
          section.category,
          section.subCategory,
          false,
        );
      }

      profileRepository.updateProfileCompletionVersion(
        section.category,
        section.subCategory,
        currentVersion,
      );
    }
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
      } else if (
        typeof value === "string" &&
        value !== "oui" &&
        value !== "non"
      ) {
        // Question type changed from choice to numeric — leftover quoted
        // string is no longer valid. "oui"/"non" are always valid publicodes
        // booleans regardless of the current rule shape, so they're kept.
        continue;
      }

      migratedProfile[profileKey] = value;
    }

    return migratedProfile;
  };

  const waitForIdle = (): Promise<void> =>
    new Promise<void>((resolve) => {
      if (typeof requestIdleCallback === "function")
        requestIdleCallback(() => resolve());
      else setTimeout(() => resolve(), 0);
    });

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
