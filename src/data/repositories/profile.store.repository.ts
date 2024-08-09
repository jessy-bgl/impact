import { appStoreActions } from "@data/store/storeActions";
import { Profile } from "@domain/entities/profile/Profile";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export class ProfileStoreRepository implements ProfileRepository {
  fetchProfile(): Profile {
    return appStoreActions.getProfile();
  }

  updateProfile(profile: Profile) {
    appStoreActions.updateProfile(profile);
    return appStoreActions.getProfile();
  }
}
