import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, useTheme } from "react-native-paper";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}>;

/**
 * The app's one card style. Paper strokes outlined cards with `outline`, the
 * text fields' contrast; Material 3 keeps cards to the lighter `outlineVariant`.
 */
export const OutlinedCard = ({ style, onPress, children }: Props) => {
  const { colors } = useTheme();

  return (
    <Card
      mode="outlined"
      onPress={onPress}
      style={[{ borderColor: colors.outlineVariant }, style]}
    >
      {children}
    </Card>
  );
};
