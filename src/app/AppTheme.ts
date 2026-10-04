import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

import {
  darkCategoryPalette,
  lightCategoryPalette,
} from "@carbonFootprint/view/theme/categoryPalette";
import { useAppStore } from "@common/store/useStore";

/**
 * Material 3 schemes generated from the brand green (#59B158) with Google's
 * material-color-utilities, `SchemeFidelity` variant: it keeps the brand
 * green itself as `primaryContainer`. The secondary palette is generated from
 * the brand's cadet blue (#5F9EA0). Elevation levels blend `primary` over
 * `surface` like react-native-paper's own MD3 themes.
 *
 * Regenerate them all together rather than tweaking one token: the pairs
 * (`primary`/`onPrimary`, ...) are built to keep their contrast.
 */
const DarkMaterialTheme = {
  ...MD3DarkTheme,
  colors: {
    primary: "#81DB7C",
    onPrimary: "#003909",
    primaryContainer: "#59B158",
    onPrimaryContainer: "#003F0B",
    secondary: "#92D2D3",
    onSecondary: "#003738",
    secondaryContainer: "#005254",
    onSecondaryContainer: "#84C3C5",
    tertiary: "#FFB0C9",
    onTertiary: "#640135",
    tertiaryContainer: "#F076A4",
    onTertiaryContainer: "#6B073A",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#10150E",
    onBackground: "#DFE4D9",
    surface: "#10150E",
    onSurface: "#DFE4D9",
    surfaceVariant: "#40493D",
    onSurfaceVariant: "#BFCAB9",
    outline: "#899485",
    outlineVariant: "#40493D",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#DFE4D9",
    inverseOnSurface: "#2D322B",
    inversePrimary: "#0C6E1E",
    elevation: {
      level0: "transparent",
      level1: "rgb(22, 31, 20)",
      level2: "rgb(25, 37, 23)",
      level3: "rgb(28, 43, 26)",
      level4: "rgb(30, 45, 27)",
      level5: "rgb(32, 49, 29)",
    },
    surfaceDisabled: "rgba(223, 228, 217, 0.12)",
    onSurfaceDisabled: "rgba(223, 228, 217, 0.38)",
    backdrop: "rgba(41, 51, 39, 0.4)",
    categories: darkCategoryPalette,
  },
};

const LightMaterialTheme = {
  ...MD3LightTheme,
  colors: {
    primary: "#0C6E1E",
    onPrimary: "#FFFFFF",
    primaryContainer: "#59B158",
    onPrimaryContainer: "#003F0B",
    secondary: "#25686A",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#ABEBED",
    onSecondaryContainer: "#2A6C6E",
    tertiary: "#A13764",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#F076A4",
    onTertiaryContainer: "#6B073A",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#93000A",
    background: "#F6FBF0",
    onBackground: "#181D16",
    surface: "#F6FBF0",
    onSurface: "#181D16",
    surfaceVariant: "#DBE6D4",
    onSurfaceVariant: "#40493D",
    outline: "#707A6C",
    outlineVariant: "#BFCAB9",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#2D322B",
    inverseOnSurface: "#EDF2E7",
    inversePrimary: "#81DB7C",
    elevation: {
      level0: "transparent",
      level1: "rgb(234, 244, 230)",
      level2: "rgb(227, 240, 223)",
      level3: "rgb(220, 235, 217)",
      level4: "rgb(218, 234, 215)",
      level5: "rgb(213, 231, 211)",
    },
    surfaceDisabled: "rgba(24, 29, 22, 0.12)",
    onSurfaceDisabled: "rgba(24, 29, 22, 0.38)",
    backdrop: "rgba(41, 51, 39, 0.4)",
    categories: lightCategoryPalette,
  },
};

// React Navigation paints its bars with its own `card`, `border` and `text`:
// point them at the scheme so headers and tab bars match the screens.
const navigationColors = ({ colors }: typeof LightMaterialTheme) => ({
  colors: {
    card: colors.surface,
    border: colors.outlineVariant,
    text: colors.onSurface,
  },
});

export const DarkTheme = merge.all([
  NavigationDarkTheme,
  DarkMaterialTheme,
  navigationColors(DarkMaterialTheme),
]) as typeof NavigationDarkTheme & typeof DarkMaterialTheme;
export const LightTheme = merge.all([
  NavigationLightTheme,
  LightMaterialTheme,
  navigationColors(LightMaterialTheme),
]) as typeof NavigationLightTheme & typeof LightMaterialTheme;

export const useAppTheme = () => {
  const themeMode = useAppStore((store) => store.theme);
  const deviceColorScheme = useColorScheme();

  if (themeMode === "auto") {
    return deviceColorScheme === "dark" ? DarkTheme : LightTheme;
  }

  return themeMode === "dark" ? DarkTheme : LightTheme;
};
