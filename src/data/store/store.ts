import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { defaultTransport } from "./storeInitialValues";
import { Transport } from "../../domain/models/transport/Transport";

export type AppState = {
  transport: Transport;
};

const appStore = (): AppState => ({
  transport: defaultTransport,
});

const middlewares = (f: any) =>
  devtools(
    persist<AppState>(f, {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }),
  );

export const useAppStore = create<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
>(middlewares(appStore));
