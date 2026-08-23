import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import WebView from "react-native-webview";

import {
  AdemeComparatorType,
  buildAdemeComparatorUrl,
} from "@carbonFootprint/domain/entities/comparator/AdemeComparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForMobile = ({ type }: Props) => {
  const { colors, dark } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <MotiView
          animate={{ backgroundColor: colors.surface }}
          style={[
            StyleSheet.absoluteFill,
            { paddingTop: 25, paddingLeft: 18, paddingRight: 18, zIndex: 1 },
          ]}
        >
          <Skeleton
            colorMode={dark ? "dark" : "light"}
            height="100%"
            width="100%"
          />
        </MotiView>
      )}

      <WebView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          opacity: isLoading ? 0 : 1,
        }}
        showsVerticalScrollIndicator={false}
        onLoadEnd={() => setTimeout(() => setIsLoading(false), 500)}
        webviewDebuggingEnabled={__DEV__}
        source={{
          uri: buildAdemeComparatorUrl(type, dark ? "night" : "default"),
        }}
      />
    </>
  );
};
