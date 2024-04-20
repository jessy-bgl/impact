import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";

export const useStyles = () => {
  const { colors } = useTheme();

  const infoTextStyle: StyleProp<TextStyle> = {
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: colors.secondary,
  };

  return { infoTextStyle };
};
