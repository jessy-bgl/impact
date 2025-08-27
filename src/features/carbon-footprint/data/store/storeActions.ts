import { useAppStore } from "@carbonFootprint/data/store/store";
import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

export const appStoreActions = {
  getAdemeProfile: () => useAppStore.getState().profile.ademe,

  updateAdemeProfile: (profile: Profile) => {
    useAppStore.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        ademe: { ...state.profile.ademe, ...profile },
      },
    }));
  },

  updateProfileCompletion: (
    category: FootprintCategory,
    subCategory: FootprintSubCategory,
    completed: boolean,
  ) => {
    useAppStore.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        completion: {
          ...state.profile.completion,
          [category]: {
            ...state.profile.completion[category],
            [subCategory]: completed,
          },
        },
      },
    }));
  },

  getTransportFootprint: () => useAppStore.getState().footprints.transport,

  setTransportFootprint: (footprint: TransportFootprint) =>
    useAppStore.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, transport: footprint },
    })),

  getFoodFootprint: () => useAppStore.getState().footprints.food,

  setFoodFootprint: (footprint: FoodFootprint) =>
    useAppStore.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, food: footprint },
    })),

  getHousingFootprint: () => useAppStore.getState().footprints.housing,

  setHousingFootprint: (footprint: HousingFootprint) =>
    useAppStore.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, housing: footprint },
    })),

  getEverydayThingsFootprint: () =>
    useAppStore.getState().footprints.everydayThings,

  setEverydayThingsFootprint: (footprint: EverydayThingsFootprint) =>
    useAppStore.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, everydayThings: footprint },
    })),

  getSocietalServicesFootprint: () =>
    useAppStore.getState().footprints.societalServices,

  setSocietalServicesFootprint: (footprint: SocietalServicesFootprint) =>
    useAppStore.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, societalServices: footprint },
    })),

  getActions: () => useAppStore.getState().actions,

  setActions: (actions: Action[]) =>
    useAppStore.setState((state) => ({ ...state, actions })),

  setShouldShowAppIntro: (shouldShow: boolean) =>
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, app: shouldShow },
    })),

  setShouldShowProfileIntro: (shouldShow: boolean) =>
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, profile: shouldShow },
    })),

  setShouldShowActionsIntro: (shouldShow: boolean) =>
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, actions: shouldShow },
    })),
};
