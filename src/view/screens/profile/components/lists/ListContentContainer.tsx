import { PropsWithChildren } from "react";
import { View } from "react-native";

import { styles } from "../styles";

export const ListContentContainer = ({ children }: PropsWithChildren) => {
  const { listContentContainer } = styles;

  return <View style={listContentContainer}>{children}</View>;
};
