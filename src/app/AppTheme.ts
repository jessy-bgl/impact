import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

import { useAppStore } from "@common/store/useStore";

const DarkMaterialTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#59B158",
    onPrimary: "#111",
    inversePrimary: "#fff",
    secondary: "#5F9EA0",
    onSecondary: "#111",
  },
};

const LightMaterialTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#59B158",
    onPrimary: "#fff",
    inversePrimary: "#111",
    secondary: "#5F9EA0",
    onSecondary: "#fff",
  },
};

export const DarkTheme = merge(NavigationDarkTheme, DarkMaterialTheme);
export const LightTheme = merge(NavigationLightTheme, LightMaterialTheme);

export const useAppTheme = () => {
  const themeMode = useAppStore((store) => store.theme);
  const deviceColorScheme = useColorScheme();

  if (themeMode === "auto") {
    return deviceColorScheme === "dark" ? DarkTheme : LightTheme;
  }

  return themeMode === "dark" ? DarkTheme : LightTheme;
};
