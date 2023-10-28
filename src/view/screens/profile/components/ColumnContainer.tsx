import { PropsWithChildren } from "react";
import { View } from "react-native";

import { styles } from "../transport/styles";

export const ColumnContainer = ({ children }: PropsWithChildren) => {
  const { columnContainer } = styles;
  return <View style={columnContainer}>{children}</View>;
};
