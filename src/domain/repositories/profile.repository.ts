import {
  FootprintCategory,
  FootprintSubCategory,
} from "@domain/entities/footprints/types";
import { Profile } from "@domain/entities/profile/Profile";

export interface ProfileRepository {
  fetchAdemeProfile(): Profile;
  updateProfileKey(
    key: keyof Profile,
    value: string | number | undefined,
  ): void;
  updateProfileCompletion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ): void;
}
