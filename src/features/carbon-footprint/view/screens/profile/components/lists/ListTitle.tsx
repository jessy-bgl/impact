import { View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  title: string;
  subtitle?: string;
};

export const ListTitle = ({ title, subtitle }: Props) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <Text variant={subtitle ? "titleSmall" : "titleMedium"}>{title}</Text>
      {subtitle && <Text variant="bodySmall">{subtitle}</Text>}
    </View>
  );
};
