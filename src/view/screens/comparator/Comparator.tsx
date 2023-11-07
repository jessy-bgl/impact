import { Platform } from "react-native";

import { ComparatorForMobile } from "./ComparatorForMobile";
import { ComparatorForWeb } from "./ComparatorForWeb";

export const Comparator = () =>
  Platform.OS === "web" ? <ComparatorForWeb /> : <ComparatorForMobile />;
