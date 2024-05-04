import { useAppStore } from "@data/store/store";
import { Action } from "@domain/entities/actions/Action";
import { EverydayThings } from "@domain/entities/categories/everyday-things/EverydayThings";
import { Food } from "@domain/entities/categories/food/Food";
import { Housing } from "@domain/entities/categories/housing/Housing";
import { Transport } from "@domain/entities/categories/transport/Transport";

export const appStoreActions = {
  getTransport: () => useAppStore.getState().emissions.transport,

  setTransport: (transport: Transport) =>
    useAppStore.setState((state) => ({
      ...state,
      emissions: { ...state.emissions, transport },
    })),

  getFood: () => useAppStore.getState().emissions.food,

  setFood: (food: Food) =>
    useAppStore.setState((state) => ({
      ...state,
      emissions: { ...state.emissions, food },
    })),

  getHousing: () => useAppStore.getState().emissions.housing,

  setHousing: (housing: Housing) =>
    useAppStore.setState((state) => ({
      ...state,
      emissions: { ...state.emissions, housing },
    })),

  getEverydayThings: () => useAppStore.getState().emissions.everydayThings,

  setEverydayThings: (everydayThings: EverydayThings) =>
    useAppStore.setState((state) => ({
      ...state,
      emissions: { ...state.emissions, everydayThings },
    })),

  getActions: () => useAppStore.getState().actions,

  setActions: (actions: Action[]) =>
    useAppStore.setState((state) => ({ ...state, actions })),
};
