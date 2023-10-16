import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  defaultFootprints,
  defaultTotalFootprintPerYear,
} from "./storeInitialValues";
import { Footprints } from "../../domain/models/Footprint";

export type AppState = {
  totalFootprintPerYear: number;
  footprints: Footprints;
};

const appStore = (): AppState => ({
  totalFootprintPerYear: defaultTotalFootprintPerYear,
  footprints: defaultFootprints,
});

const middlewares = (f: any) =>
  devtools(
    persist<AppState>(f, {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }),
  );

export const useAppStore = create<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
>(middlewares(appStore));
