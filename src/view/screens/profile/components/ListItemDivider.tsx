import { Divider } from "react-native-paper";

import { styles } from "./styles";

export const ListItemDivider = () => {
  const { divider } = styles;
  return <Divider style={divider} />;
};
