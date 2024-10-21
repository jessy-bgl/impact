import { Profile } from "@domain/entities/profile/Profile";

export interface ProfileRepository {
  fetchAdemeProfile(): Profile;
  updateAdemeProfile(profile: Profile): Profile;
  updateProfileKey(
    key: keyof Profile,
    value: string | number | undefined,
  ): Profile;
  removeProfileKey(key: keyof Profile): Profile;
}
