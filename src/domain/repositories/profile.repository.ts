import { Profile } from "@domain/entities/profile/Profile";

export interface ProfileRepository {
  fetchAdemeProfile(): Profile;
  updateProfileKey(
    key: keyof Profile,
    value: string | number | undefined,
  ): void;
}
