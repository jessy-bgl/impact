import AsyncStorage from "@react-native-async-storage/async-storage";
import deepMerge from "deepmerge";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { Action } from "@domain/entities/action/Action";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { Profile } from "@domain/entities/profile/Profile";

export type AppState = {
  isFirstLaunch: boolean;
  profile: {
    ademe: Profile;
  };
  footprints: {
    transport: TransportFootprint;
    food: FoodFootprint;
    housing: HousingFootprint;
    everydayThings: EverydayThingsFootprint;
    societalServices: SocietalServicesFootprint;
  };
  actions: Action[];
};

const appStore = (): AppState => ({
  isFirstLaunch: true,
  profile: {
    ademe: {},
  },
  footprints: {
    transport: AdemeFootprintEngine.computeTransportFootprint(),
    food: AdemeFootprintEngine.computeFoodFootprint(),
    housing: AdemeFootprintEngine.computeHousingFootprint(),
    everydayThings: AdemeFootprintEngine.computeEverydayThingsFootprint(),
    societalServices: AdemeFootprintEngine.computeSocietalServicesFootprint(),
  },
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
