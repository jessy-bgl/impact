import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { AdemeComparatorType } from "@view/screens/comparator/Comparator";
import { useWebComparator } from "@view/screens/comparator/useWebComparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForWeb = ({ type }: Props) => {
  const { ademeComparator, isLoading, showComparator } = useWebComparator(type);

  return (
    <>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      <div
        ref={ademeComparator}
        style={{
          overflow: "auto",
          visibility: showComparator ? "visible" : "hidden",
        }}
      />
    </>
  );
};
