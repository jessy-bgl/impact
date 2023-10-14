import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  defaultFootprintPerCategory,
  defaultTotalFootprintPerYear,
} from "./storeInitialValues";
import { FootprintByCategory } from "../../domain/models/transport/car/FootprintCategories";

export type AppState = {
  totalFootprintPerYear: number;
  footprintPerCategory: FootprintByCategory[];
};

const appStore = (): AppState => ({
  totalFootprintPerYear: defaultTotalFootprintPerYear,
  footprintPerCategory: defaultFootprintPerCategory,
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
