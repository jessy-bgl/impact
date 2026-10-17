import { useIsFocused, useRoute } from "@react-navigation/native";

import { AdemeComparatorType } from "@carbonFootprint/domain/entities/comparator/AdemeComparator";
import { ComparatorForMobile } from "@carbonFootprint/view/screens/comparator/ComparatorMobile";

export const Comparator = () => {
  const { params } = useRoute();

  // This is a workaround to improve performance
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  if (!params || !(params as any).type) return <></>;

  const type: AdemeComparatorType = (params as any).type;

  return <ComparatorForMobile type={type} />;
};
