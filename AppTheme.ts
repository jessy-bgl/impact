import { DarkTheme as NavigationTheme } from "@react-navigation/native";
import merge from "deepmerge";
import { MD3DarkTheme } from "react-native-paper";

const MaterialTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#59B158",
    onPrimary: "#111",
    inversePrimary: "#fff",
    secondary: "#5F9EA0",
    onSecondary: "#111",
    // background: "#282731",
  },
};

export const AppTheme = merge(NavigationTheme, MaterialTheme);
