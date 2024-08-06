import { Profile } from "@domain/entities/profile/Profile";

export interface ProfileRepository {
  fetchProfile(): Profile;
  updateProfile(profile: Profile): Profile;
}
