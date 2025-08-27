import AsyncStorage from "@react-native-async-storage/async-storage";
import deepMerge from "deepmerge";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { defaultAppStore } from "@carbonFootprint/data/store/storeDefaultValues";
import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import {
  EverydayThingsFootprintSubCategory,
  FoodFootprintSubCategory,
  HousingFootprintSubCategory,
  SocietalServicesFootprintSubCategory,
  TransportFootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { isTestMode } from "@common/constants";

export type AppStore = {
  shouldShowIntro: {
    app: boolean;
    profile: boolean;
    actions: boolean;
  };
  profile: {
    ademe: Profile;
    completion: {
      transport: Record<TransportFootprintSubCategory, boolean>;
      food: Record<FoodFootprintSubCategory, boolean>;
      housing: Record<HousingFootprintSubCategory, boolean>;
      everydayThings: Record<EverydayThingsFootprintSubCategory, boolean>;
      societalServices: Record<SocietalServicesFootprintSubCategory, boolean>;
    };
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

const appStore = (): AppStore => defaultAppStore;

const middlewares = (f: any) =>
  devtools(
    persist<AppStore>(f, {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState as AppStore),
    }),
  );

export const useAppStore = isTestMode
  ? create(appStore)
  : create<
      AppStore,
      [["zustand/devtools", never], ["zustand/persist", unknown]]
    >(middlewares(appStore));
