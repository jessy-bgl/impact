import { useAppStore } from "@data/store/store";
import { Food } from "@domain/models/food/Food";
import { Transport } from "@domain/models/transport/Transport";

export const appStoreActions = {
  getTransport: () => useAppStore.getState().transport,

  setTransport: (transport: Transport) =>
    useAppStore.setState((state) => ({ ...state, transport })),

  getFood: () => useAppStore.getState().food,

  setFood: (food: Food) =>
    useAppStore.setState((state) => ({ ...state, food })),
};
