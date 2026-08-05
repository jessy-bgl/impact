import deepMerge from "deepmerge";

import { AppStore } from "@common/store/store";

type ProfileCompletion = AppStore["profile"]["completion"];

export const mergePersistedState = (
  persistedState: unknown,
  currentState: AppStore,
): AppStore => {
  const merged = deepMerge(currentState, persistedState as AppStore, {
    arrayMerge: (_, sourceArray) => sourceArray,
  });

  return {
    ...merged,
    profile: {
      ...merged.profile,
      completion: pruneUnknownSubCategories(
        currentState.profile.completion,
        merged.profile.completion,
      ),
    },
  };
};

/**
 * Keeps only the sub-categories the app still knows about.
 *
 * A category is displayed as completed when every one of its completion flags is
 * true. `deepMerge` unions the keys of the current and the persisted states, so
 * a sub-category removed from the code survives in the storage of users who
 * already opened the app and pins their category to "incomplete" forever.
 */
const pruneUnknownSubCategories = (
  reference: ProfileCompletion,
  merged: ProfileCompletion,
): ProfileCompletion =>
  Object.fromEntries(
    Object.entries(reference).map(([category, subCategories]) => [
      category,
      Object.fromEntries(
        Object.keys(subCategories).map((subCategory) => [
          subCategory,
          merged[category as keyof ProfileCompletion]?.[
            subCategory as keyof ProfileCompletion[keyof ProfileCompletion]
          ] ?? false,
        ]),
      ),
    ]),
  ) as unknown as ProfileCompletion;
