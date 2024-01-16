import AsyncStorage from "@react-native-async-storage/async-storage";
import deepMerge from "deepmerge";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { Food } from "@domain/entities/food/Food";
import { Transport } from "@domain/entities/transport/Transport";
import { Housing } from "@domain/entities/housing/Housing";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";

export type AppState = {
  transport: Transport;
  food: Food;
  housing: Housing;
  everydayThings: EverydayThings;
};

const appStore = (): AppState => ({
  transport: new Transport({}),
  food: new Food({}),
  housing: new Housing({}),
  everydayThings: new EverydayThings({}),
});

const middlewares = (f: any) =>
  devtools(
    persist<AppState>(f, {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState as AppState),
    }),
  );

export const useAppStore = create<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
>(middlewares(appStore));
