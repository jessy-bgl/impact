import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const badgeSize = 32;

type Props = {
  color: string;
  /** Whatever the badge stands for here: the category emoji, or its share. */
  label: string;
  fontSize?: number;
};

/** The round category marker, shared by the filter sheet and the selection card. */
export const CategoryBadge = ({ color, label, fontSize = 14 }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: badgeSize,
        height: badgeSize,
        borderRadius: badgeSize / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize, color: colors.background }}>{label}</Text>
    </View>
  );
};
