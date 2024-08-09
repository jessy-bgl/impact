import { Profile } from "@domain/entities/profile/Profile";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export const createFetchProfile = (profileRepository: ProfileRepository) => {
  const fetchProfile = (): Profile => {
    return profileRepository.fetchProfile();
  };
  return fetchProfile;
};
