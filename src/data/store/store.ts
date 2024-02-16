import AsyncStorage from "@react-native-async-storage/async-storage";
import deepMerge from "deepmerge";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { Action } from "@domain/entities/actions/Action";
import { EverydayThings } from "@domain/entities/categories/everyday-things/EverydayThings";
import { Food } from "@domain/entities/categories/food/Food";
import { Housing } from "@domain/entities/categories/housing/Housing";
import { Transport } from "@domain/entities/categories/transport/Transport";

export type AppState = {
  transport: Transport;
  food: Food;
  housing: Housing;
  everydayThings: EverydayThings;
  actions: Action[];
};

const appStore = (): AppState => ({
  transport: new Transport({}),
  food: new Food({}),
  housing: new Housing({}),
  everydayThings: new EverydayThings({}),
  actions: [],
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
