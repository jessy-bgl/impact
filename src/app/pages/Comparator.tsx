import {
  useFocusEffect,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import WebView from "react-native-webview";

import {
  AdemeComparatorType,
  buildAdemeComparatorUrl,
} from "@carbonFootprint/domain/entities/comparator/AdemeComparator";

export const Comparator = () => {
  const { params } = useRoute();
  const { colors, dark } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  // The WebView remounts on refocus, so show the skeleton again
  useFocusEffect(useCallback(() => () => setIsLoading(true), []));

  // This is a workaround to improve performance
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  if (!params || !(params as any).type) return <></>;

  const type: AdemeComparatorType = (params as any).type;

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

      <View
        style={{
          flex: 1,
          paddingHorizontal: 18,
          backgroundColor: colors.background,
        }}
      >
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
      </View>
    </>
  );
};
