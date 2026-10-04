import { useTheme } from "react-native-paper";

/**
 * Material 3 tab colors. Left alone, the inactive tabs are the active color at
 * half opacity: too faint to read, and they look disabled.
 */
export const useTopTabsColors = () => {
  const { colors } = useTheme();

  return {
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.onSurfaceVariant,
  };
};
