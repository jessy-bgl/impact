import { appStoreActions } from "@data/store/storeActions";
import { Profile } from "@domain/entities/profile/Profile";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export class ProfileStoreRepository implements ProfileRepository {
  fetchAdemeProfile(): Profile {
    return appStoreActions.getAdemeProfile();
  }

  updateAdemeProfile(profile: Profile) {
    appStoreActions.updateAdemeProfile(profile);
    return appStoreActions.getAdemeProfile();
  }

  updateProfileKey(key: keyof Profile, value: string | number | undefined) {
    appStoreActions.updateAdemeProfile({ [key]: value });
    return appStoreActions.getAdemeProfile();
  }

  removeProfileKey(key: keyof Profile) {
    const profile = appStoreActions.getAdemeProfile();
    delete profile[key];
    appStoreActions.updateAdemeProfile(profile, true);
    return appStoreActions.getAdemeProfile();
  }
}
