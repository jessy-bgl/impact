import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { ProfileCompletion } from "@carbonFootprint/domain/entities/profile/profileCompletion";

export interface ProfileRepository {
  fetchAdemeProfile(): Profile;
  fetchProfileCompletion(): ProfileCompletion;
  updateProfileKey(
    key: keyof Profile,
    value: string | number | undefined,
  ): void;
  updateProfileKeys(
    values: Partial<Record<keyof Profile, string | number>>,
  ): void;
  updateProfileCompletion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ): void;
  fetchProfileCompletionVersion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
  ): string | undefined;
  updateProfileCompletionVersion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    version: string,
  ): void;
}
