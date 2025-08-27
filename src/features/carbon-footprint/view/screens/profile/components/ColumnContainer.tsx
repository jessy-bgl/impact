import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

import { styles } from "@carbonFootprint/view/screens/profile/components/styles";

export const ColumnContainer = ({
  children,
  style,
}: PropsWithChildren & { style?: ViewStyle }) => {
  const { columnContainer } = styles;
  return <View style={{ ...columnContainer, ...style }}>{children}</View>;
};
