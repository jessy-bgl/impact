import { View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

/**
 * Development scaffolding: render only behind `__DEV__`. The label is
 * hardcoded on purpose — it must never reach a released build, so it has no
 * business in the translation files.
 */
export const DevFakeDataSwitch = ({ value, onValueChange }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
        {value ? "Données de démo (dev)" : "Vraies données"}
      </Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};
