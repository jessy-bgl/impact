import { Action } from "@carbonFootprint/domain/entities/action/Action";
import {
  EverydayThingsFootprintSubCategory,
  FoodFootprintSubCategory,
  Footprints,
  HousingFootprintSubCategory,
  SocietalServicesFootprintSubCategory,
  TransportFootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { defaultAppStoreValues } from "@common/store/storeDefaultValues";

export type ThemeMode = "light" | "dark" | "auto";

export type AppStore = {
  theme: ThemeMode;
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
  footprints: Footprints;
  actions: Action[];
};

export const defaultAppStore = (): AppStore => defaultAppStoreValues;
