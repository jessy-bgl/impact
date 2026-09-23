import { create } from "zustand";

type CurrentScreenState = { currentScreen?: string };

/**
 * Route on display, fed by the navigation container. Kept outside React state
 * so a route change only re-renders the tours reading it, not the whole app.
 */
const useCurrentScreenStore = create<CurrentScreenState>(() => ({}));

export const setCurrentScreen = (currentScreen?: string) =>
  useCurrentScreenStore.setState({ currentScreen });

export const useCurrentScreen = () =>
  useCurrentScreenStore((state) => state.currentScreen);
