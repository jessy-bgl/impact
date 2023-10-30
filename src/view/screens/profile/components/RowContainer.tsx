import { PropsWithChildren } from "react";
import { View } from "react-native";

import { styles } from "./styles";

export const RowContainer = ({ children }: PropsWithChildren) => {
  const { rowContainer } = styles;
  return <View style={rowContainer}>{children}</View>;
};