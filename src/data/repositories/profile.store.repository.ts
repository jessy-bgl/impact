import { appStoreActions } from "@data/store/storeActions";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@domain/entities/footprints/types";
import { Profile } from "@domain/entities/profile/Profile";
import { ProfileRepository } from "@domain/repositories/profile.repository";

export class ProfileStoreRepository implements ProfileRepository {
  fetchAdemeProfile(): Profile {
    return appStoreActions.getAdemeProfile();
  }

  updateProfileKey(key: keyof Profile, value: string | number | undefined) {
    appStoreActions.updateAdemeProfile({ [key]: value });
  }

  updateProfileCompletion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ) {
    appStoreActions.updateProfileCompletion(category, subCategory, completed);
  }
}
