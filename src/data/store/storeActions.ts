import { useAppStore } from "@data/store/store";
import { Action } from "@domain/entities/action/Action";
import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { Profile } from "@domain/entities/profile/Profile";

export const appStoreActions = {
  setShouldShowAppIntro: (shouldShow: boolean) =>
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, app: shouldShow },
    })),

  setShouldShowActionsIntro: (shouldShow: boolean) =>
    useAppStore.setState((state) => ({
      ...state,
      shouldShowIntro: { ...state.shouldShowIntro, actions: shouldShow },
    })),

  getAdemeProfile: () => useAppStore.getState().profile.ademe,

  updateAdemeProfile: (profile: Profile, override = false) => {
    if (override) {
      useAppStore.setState((state) => ({
        ...state,
        profile: { ...state.profile, ademe: profile },
      }));
    } else {
      useAppStore.setState((state) => ({
        ...state,
        profile: { ademe: { ...state.profile.ademe, ...profile } },
      }));
    }
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

  getActions: () => useAppStore.getState().actions,

  setActions: (actions: Action[]) =>
    useAppStore.setState((state) => ({ ...state, actions })),
};
