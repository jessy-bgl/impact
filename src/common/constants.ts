import { Platform } from "react-native";

export const isTestMode = process.env.NODE_ENV === "test";

// Hidden system bars and fake data for store screenshots, never in a release build.
export const isDemoMode =
  __DEV__ &&
  Platform.OS === "android" &&
  process.env.EXPO_PUBLIC_DEMO_MODE === "true";
