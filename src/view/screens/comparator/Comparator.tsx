import { Platform } from "react-native";

import { ComparatorForMobile } from "@view/screens/comparator/ComparatorForMobile";
import { ComparatorForWeb } from "@view/screens/comparator/ComparatorForWeb";

export const Comparator = () =>
  Platform.OS === "web" ? <ComparatorForWeb /> : <ComparatorForMobile />;
