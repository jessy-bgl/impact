import { AdemeEngine } from "@domain/entities/AdemeEngine";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export const createSyncStoredProfileWithEngine = (
  profileRepository: ProfileRepository,
) => {
  const syncStoredProfileWithEngine = (): void => {
    const profile = profileRepository.fetchAdemeProfile();
    AdemeEngine.setSituation(profile);
  };
  return syncStoredProfileWithEngine;
};
