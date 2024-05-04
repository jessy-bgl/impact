import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useTheme } from "react-native-paper";

import { AdemeComparatorType } from "@view/screens/comparator/Comparator";
import { useWebComparator } from "@view/screens/comparator/useWebComparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForWeb = ({ type }: Props) => {
  const { colors } = useTheme();
  const { ademeComparator, isLoading, showComparator } = useWebComparator(type);

  return (
    <>
      {isLoading && (
        <MotiView
          animate={{ backgroundColor: colors.surface }}
          style={{ padding: 20 }}
        >
          <Skeleton height={window.innerHeight} width="100%" />
        </MotiView>
      )}

      <div
        ref={ademeComparator}
        style={{
          overflow: "auto",
          display: showComparator ? "block" : "none",
        }}
      />
    </>
  );
};
