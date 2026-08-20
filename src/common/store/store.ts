import { Action } from "@carbonFootprint/domain/entities/action/Action";
import {
  EverydayThingsFootprintSubCategory,
  FoodFootprintSubCategory,
  FootprintCategory,
  FootprintSubCategory,
  Footprints,
  HousingFootprintSubCategory,
  SocietalServicesFootprintSubCategory,
  TransportFootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { defaultAppStoreValues } from "@common/store/storeDefaultValues";
import { AnalyticsConsent } from "@consent/domain/entities/Consent";

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
    completionVersions: Record<
      FootprintCategory,
      Partial<Record<FootprintSubCategory, string>>
    >;
  };
  footprints: Footprints;
  actions: Action[];
  analyticsConsent: AnalyticsConsent;
};

export const defaultAppStore = (): AppStore => defaultAppStoreValues;
