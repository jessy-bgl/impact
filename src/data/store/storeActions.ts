import { useAppStore } from "./store";
import { Transport } from "../../domain/models/transport/Transport";

export const appStoreActions = {
  getTransport: () => useAppStore.getState().transport,

  setTransport: (transport: Transport) =>
    useAppStore.setState((state) => ({ ...state, transport })),
};
