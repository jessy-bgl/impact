import { useAppStore } from "@data/store/store";
import { EverydayThings } from "@domain/models/everyday-things/EverydayThings";
import { Food } from "@domain/models/food/Food";
import { Housing } from "@domain/models/housing/Housing";
import { Transport } from "@domain/models/transport/Transport";

export const appStoreActions = {
  getTransport: () => useAppStore.getState().transport,

  setTransport: (transport: Transport) =>
    useAppStore.setState((state) => ({ ...state, transport })),

  getFood: () => useAppStore.getState().food,

  setFood: (food: Food) =>
    useAppStore.setState((state) => ({ ...state, food })),

  getHousing: () => useAppStore.getState().housing,

  setHousing: (housing: Housing) =>
    useAppStore.setState((state) => ({ ...state, housing })),

  getEverydayThings: () => useAppStore.getState().everydayThings,

  setEverydayThings: (everydayThings: EverydayThings) =>
    useAppStore.setState((state) => ({ ...state, everydayThings })),
};
