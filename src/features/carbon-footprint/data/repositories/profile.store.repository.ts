import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";
import { useAppStore } from "@common/store/useStore";

export class ProfileStoreRepository implements ProfileRepository {
  constructor(private store: typeof useAppStore) {}

  fetchAdemeProfile(): Profile {
    return this.store.getState().profile.ademe;
  }

  updateProfileKey(key: keyof Profile, value: string | number | undefined) {
    this.store.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        ademe: {
          ...state.profile.ademe,
          [key]: value,
        },
      },
    }));
  }

  updateProfileKeys(values: Profile) {
    this.store.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        ademe: {
          ...state.profile.ademe,
          ...values,
        },
      },
    }));
  }

  updateProfileCompletion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ) {
    this.store.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        completion: {
          ...state.profile.completion,
          [category]: {
            ...state.profile.completion[category],
            [subCategory]: completed,
          },
        },
      },
    }));
  }

  fetchProfileCompletionVersion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
  ): string | undefined {
    return this.store.getState().profile.completionVersions[category]?.[
      subCategory
    ];
  }

  updateProfileCompletionVersion(
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    version: string,
  ) {
    this.store.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        completionVersions: {
          ...state.profile.completionVersions,
          [category]: {
            ...state.profile.completionVersions[category],
            [subCategory]: version,
          },
        },
      },
    }));
  }
}
