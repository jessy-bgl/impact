import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useFootprintsHistory } from "@carbonFootprint/domain/hooks/useFootprintsHistory";
import { BottomSheetProvider } from "@common/context/BottomSheetContext";
import { DevHistoryPreviewPicker } from "@carbonFootprint/view/screens/history/DevHistoryPreviewPicker";
import {
  DevHistoryPreview,
  devHistoryOverrides,
} from "@carbonFootprint/view/screens/history/devFakeHistory";
import {
  HistoryChart,
  maxHistoryContentWidth,
} from "@carbonFootprint/view/screens/history/HistoryChart";
import { HistoryEmptyState } from "@carbonFootprint/view/screens/history/HistoryEmptyState";
import { HistoryFilterButton } from "@carbonFootprint/view/screens/history/HistoryFilterButton";
import { HistorySelectionCard } from "@carbonFootprint/view/screens/history/HistorySelectionCard";
import { HistoryVariationCard } from "@carbonFootprint/view/screens/history/HistoryVariationCard";

export const EmissionsHistory = () => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const [devPreview, setDevPreview] = useState<DevHistoryPreview>("real");

  const {
    points,
    hasEnoughData,
    currentValue,
    variation,
    selection,
    emptyStateVariant,
    filter,
    selectFilter,
    togglePoint,
    clearSelection,
  } = useFootprintsHistory(devHistoryOverrides[devPreview]);

  // Dev-only, so every state can be reviewed before real snapshots exist. Stays
  // visible on the empty states: that is exactly where it is needed.
  const devPreviewPicker = __DEV__ ? (
    <DevHistoryPreviewPicker value={devPreview} onValueChange={setDevPreview} />
  ) : null;

  // The filter sheet's host wraps both branches, so that switching from the
  // empty state to the chart does not remount it.
  if (!hasEnoughData)
    return (
      <BottomSheetProvider>
        <View style={{ flex: 1, paddingTop: 16 }}>
          {devPreviewPicker}
          <HistoryEmptyState variant={emptyStateVariant} />
        </View>
      </BottomSheetProvider>
    );

  return (
    <BottomSheetProvider>
      <ScrollView contentContainerStyle={{ gap: 16, paddingVertical: 16 }}>
        {devPreviewPicker}

        {/* Title and filter share a line: on a phone the wrapped filter chips
            used to push the chart below the fold on their own. */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            paddingHorizontal: 16,
          }}
        >
          <Text variant="titleMedium" style={{ flexShrink: 1 }}>
            {t("history.title")}
          </Text>

          <HistoryFilterButton filter={filter} onSelect={selectFilter} />
        </View>

        <View style={{ alignItems: "center" }}>
          <HistoryChart
            points={points}
            filter={filter}
            selectedDate={selection?.date ?? null}
            onSelectPoint={togglePoint}
          />
        </View>

        <View
          style={{
            width: "100%",
            maxWidth: maxHistoryContentWidth,
            alignSelf: "center",
          }}
        >
          {/* A selected point tells the whole story on its own: its value, how
              today compares to it and — under the total filter — its category
              split. The current-value card would only repeat half of it. */}
          {selection ? (
            <HistorySelectionCard
              {...selection}
              onClearSelection={clearSelection}
            />
          ) : (
            variation && (
              <HistoryVariationCard
                currentValue={currentValue}
                variation={variation}
              />
            )
          )}
        </View>

        {!selection && (
          <Text
            variant="bodySmall"
            style={{
              textAlign: "center",
              color: colors.onSurfaceVariant,
              paddingHorizontal: 32,
            }}
          >
            {t("history.selectHint")}
          </Text>
        )}
      </ScrollView>
    </BottomSheetProvider>
  );
};
