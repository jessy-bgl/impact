import { View } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type Props = {
  color: string;
  icon: IconSource;
};

export const ActionCardCategoryIcon = ({ color, icon }: Props) => {
  const { colors, roundness } = useTheme();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: color,
        borderTopRightRadius: roundness,
        borderBottomLeftRadius: roundness,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon source={icon} size={25} color={colors.surfaceVariant} />
    </View>
  );
};
