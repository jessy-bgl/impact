import { appStoreActions } from "@data/store/storeActions";
import { Profile } from "@domain/entities/profile/Profile";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export class ProfileStoreRepository implements ProfileRepository {
  fetchAdemeProfile(): Profile {
    return appStoreActions.getAdemeProfile();
  }

  updateProfileKey(key: keyof Profile, value: string | number | undefined) {
    appStoreActions.updateAdemeProfile({ [key]: value });
  }
}
