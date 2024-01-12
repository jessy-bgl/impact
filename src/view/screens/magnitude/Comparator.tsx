import { Platform } from "react-native";

import { ComparatorForMobile } from "@view/screens/magnitude/ComparatorForMobile";
import { ComparatorForWeb } from "@view/screens/magnitude/ComparatorForWeb";

export const Comparator = () =>
  Platform.OS === "web" ? <ComparatorForWeb /> : <ComparatorForMobile />;
