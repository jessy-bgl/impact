import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

import { styles } from "@carbonFootprint/view/screens/profile/components/styles";

export const RowContainer = ({
  children,
  style,
}: PropsWithChildren & { style?: ViewStyle }) => {
  const { rowContainer } = styles;
  return <View style={{ ...rowContainer, ...style }}>{children}</View>;
};
