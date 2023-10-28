import { Divider } from "react-native-paper";

import { styles } from "../transport/styles";

export const ListItemDivider = () => {
  const { divider } = styles;
  return <Divider style={divider} />;
};
