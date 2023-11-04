import { Platform } from "react-native";

import { ComparatorForMobile } from "./ComparatorForMobile";
import { ComparatorForWeb } from "./ComparatorForWeb";

export const Comparator = () => {
  if (Platform.OS === "web") {
    return <ComparatorForWeb />;
  } else {
    return <ComparatorForMobile />;
  }
};
