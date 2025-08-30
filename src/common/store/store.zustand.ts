import AsyncStorage from "@react-native-async-storage/async-storage";
import deepMerge from "deepmerge";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { isTestMode } from "@common/constants";
import { AppStore, defaultAppStore } from "@common/store/store";

const middlewares = (f: any) =>
  devtools(
    persist<AppStore>(f, {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState as AppStore),
    }),
  );

export const zustandAppStore = isTestMode
  ? create(defaultAppStore)
  : create<
      AppStore,
      [["zustand/devtools", never], ["zustand/persist", unknown]]
    >(middlewares(defaultAppStore));
