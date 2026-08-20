import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useFootprintsHistory } from "@carbonFootprint/domain/hooks/useFootprintsHistory";
import { DevFakeDataSwitch } from "@carbonFootprint/view/screens/history/DevFakeDataSwitch";
import { devFakeHistory } from "@carbonFootprint/view/screens/history/devFakeHistory";
import { HistoryBreakdown } from "@carbonFootprint/view/screens/history/HistoryBreakdown";
import {
  HistoryChart,
  maxHistoryContentWidth,
} from "@carbonFootprint/view/screens/history/HistoryChart";
import { HistoryEmptyState } from "@carbonFootprint/view/screens/history/HistoryEmptyState";
import { HistoryFilterChips } from "@carbonFootprint/view/screens/history/HistoryFilterChips";
import { HistoryVariationCard } from "@carbonFootprint/view/screens/history/HistoryVariationCard";

export const EmissionsHistory = () => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const [showFakeData, setShowFakeData] = useState(false);

  const {
    viewModel,
    filter,
    selectFilter,
    togglePoint,
    clearSelection,
    isProfileComplete,
  } = useFootprintsHistory(showFakeData ? devFakeHistory : undefined);

  const {
    points,
    hasEnoughData,
    currentValue,
    variation,
    selectedDate,
    breakdown,
  } = viewModel;

  // Dev-only, so the chart can be reviewed before real snapshots exist. Stays
  // visible on the empty state: that is exactly where it is needed.
  const fakeDataSwitch = __DEV__ ? (
    <DevFakeDataSwitch value={showFakeData} onValueChange={setShowFakeData} />
  ) : null;

  if (!hasEnoughData)
    return (
      <View style={{ flex: 1, paddingTop: 16 }}>
        {fakeDataSwitch}
        <HistoryEmptyState
          loneValue={
            isProfileComplete && points.length === 1 ? currentValue : null
          }
        />
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingVertical: 16 }}>
      {fakeDataSwitch}

      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        {t("history.title")}
      </Text>

      <HistoryFilterChips filter={filter} onSelect={selectFilter} />

      <View style={{ alignItems: "center" }}>
        <HistoryChart
          points={points}
          filter={filter}
          selectedDate={selectedDate}
          onSelectPoint={togglePoint}
        />
      </View>

      {variation && (
        <View
          style={{
            width: "100%",
            maxWidth: maxHistoryContentWidth,
            alignSelf: "center",
          }}
        >
          <HistoryVariationCard
            currentValue={currentValue}
            variation={variation}
          />
        </View>
      )}

      {breakdown && selectedDate ? (
        <View
          style={{
            width: "100%",
            maxWidth: maxHistoryContentWidth,
            alignSelf: "center",
          }}
        >
          <HistoryBreakdown breakdown={breakdown} date={selectedDate} />
        </View>
      ) : (
        filter === "all" && (
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
        )
      )}
    </ScrollView>
  );
};
