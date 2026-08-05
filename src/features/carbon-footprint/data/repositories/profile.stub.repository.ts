import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";

export class ProfileStubRepository implements ProfileRepository {
  profile: Profile = {};
  completion: Partial<
    Record<FootprintCategory, Partial<Record<FootprintSubCategory, boolean>>>
  > = {};
  completionVersions: Partial<
    Record<FootprintCategory, Partial<Record<FootprintSubCategory, string>>>
  > = {};

  fetchAdemeProfile(): Profile {
    return this.profile;
  }

  updateProfileKey(
    key: keyof Profile,
    value: string | number | undefined,
  ): void {
    this.profile = { ...this.profile, [key]: value };
  }

  updateProfileKeys(values: Profile): void {
    this.profile = { ...this.profile, ...values };
  }

  updateProfileCompletion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ): void {
    this.completion[category] = {
      ...this.completion[category],
      [subCategory]: completed,
    };
  }

  fetchProfileCompletionVersion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
  ): string | undefined {
    return this.completionVersions[category]?.[subCategory];
  }

  updateProfileCompletionVersion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    version: string,
  ): void {
    this.completionVersions[category] = {
      ...this.completionVersions[category],
      [subCategory]: version,
    };
  }

  setTestProfileKey(key: string, value: string | number | undefined): void {
    (this.profile as Record<string, unknown>)[key] = value;
  }

  getTestProfileKey(key: string): unknown {
    return (this.profile as Record<string, unknown>)[key];
  }
}
