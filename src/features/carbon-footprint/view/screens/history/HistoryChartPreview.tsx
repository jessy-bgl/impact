import { useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "react-native-paper";

import { maxHistoryContentWidth } from "@carbonFootprint/view/screens/history/HistoryChart";

const previewHeight = 120;
const horizontalPadding = 32;
const dataPointRadius = 3;

/**
 * Shape only — the numbers are never shown, so they carry no unit and no date.
 * A rebound in the middle keeps the curve from reading as a straight slide, the
 * same intent as `devFakeHistory`.
 */
const previewSeries = [12.9, 12.1, 11.2, 11.6, 10.4, 9.6, 8.8];

/** The curve draws nothing a query could match, so tests reach for it by id. */
export const historyChartPreviewTestId = "history-chart-preview";

/**
 * A decorative curve for the history empty states: it shows what the tracking
 * will look like instead of only describing it.
 *
 * Deliberately not `HistoryChart` — that one carries a scrolling plot, a pinned
 * y axis and a selection overlay, none of which mean anything without real
 * snapshots behind them.
 */
export const HistoryChartPreview = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const previewWidth = Math.min(
    width - horizontalPadding * 2,
    maxHistoryContentWidth,
  );

  // The first and last dots are centred on the plot's own edges, so half of
  // each would be clipped. Inset the plot by that half on both sides.
  const plotWidth = previewWidth - dataPointRadius * 2;
  const pointSpacing = plotWidth / (previewSeries.length - 1);

  return (
    <View testID={historyChartPreviewTestId} style={{ width: previewWidth }}>
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ opacity: 0.55 }}
      >
        <LineChart
          data={previewSeries.map((value) => ({ value }))}
          width={previewWidth}
          height={previewHeight}
          // gifted-charts keeps a label column and a trailing gap even with the
          // axes hidden. Zeroed out, or the curve sits off-centre in its box.
          yAxisLabelWidth={0}
          initialSpacing={dataPointRadius}
          endSpacing={dataPointRadius}
          spacing={pointSpacing}
          hideAxesAndRules
          hideYAxisText
          xAxisThickness={0}
          yAxisThickness={0}
          areaChart
          curved
          color={colors.primary}
          startFillColor={colors.primary}
          endFillColor={colors.primary}
          startOpacity={0.35}
          endOpacity={0.02}
          thickness={2}
          dataPointsColor={colors.primary}
          dataPointsRadius={dataPointRadius}
        />
      </View>
    </View>
  );
};
