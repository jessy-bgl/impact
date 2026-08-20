import { useTranslation } from "react-i18next";
import { Pressable, View, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "react-native-paper";

import {
  HistoryFilter,
  HistoryPoint,
} from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import {
  filterColor,
  formatLongDate,
  formatShortDate,
  formatTonnes,
} from "@carbonFootprint/view/screens/history/historyFormat";

const chartHeight = 200;
const maxChartWidth = 380;
const horizontalPadding = 16;
const yAxisLabelWidth = 40;
const endLabelMargin = 32;
export const maxHistoryContentWidth = yAxisLabelWidth + maxChartWidth;
const initialSpacing = 20;

type Props = {
  points: HistoryPoint[];
  filter: HistoryFilter;
  selectedDate: string | null;
  onSelectPoint: (date: string) => void;
};

export const HistoryChart = ({
  points,
  filter,
  selectedDate,
  onSelectPoint,
}: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const color = filterColor(filter, colors.primary);

  // Only the total has a category split to reveal, so points are inert under a
  // category filter.
  const isSelectable = filter === "all";

  const availableWidth = width - horizontalPadding * 2;
  const plotWidth = Math.min(availableWidth - yAxisLabelWidth, maxChartWidth);
  const chartWidth = plotWidth - endLabelMargin;
  const totalChartWidth = yAxisLabelWidth + plotWidth;
  const pointSpacing = (chartWidth - initialSpacing) / (points.length - 1);

  const data = points.map((point) => ({
    value: point.value / 1000,
    label: formatShortDate(point.date),
    dataPointColor: point.date === selectedDate ? colors.onBackground : color,
    dataPointRadius: point.date === selectedDate ? 6 : 4,
  }));

  return (
    <View style={{ paddingHorizontal: horizontalPadding }}>
      {/* Safety net: even with `endLabelMargin` reserved, clip so nothing can
          ever escape the screen if the estimate is a few pixels short. */}
      <View style={{ width: totalChartWidth, overflow: "hidden" }}>
        <LineChart
          data={data}
          width={chartWidth}
          height={chartHeight}
          yAxisLabelWidth={yAxisLabelWidth}
          endSpacing={endLabelMargin}
          adjustToWidth
          disableScroll
          areaChart
          curved
          color={color}
          startFillColor={color}
          endFillColor={color}
          startOpacity={0.35}
          endOpacity={0.02}
          thickness={2}
          hideDataPoints={false}
          dataPointsColor={color}
          yAxisColor={colors.outline}
          xAxisColor={colors.outline}
          rulesColor={colors.surfaceVariant}
          yAxisTextStyle={{ color: colors.onSurfaceVariant, fontSize: 10 }}
          xAxisLabelTextStyle={{
            color: colors.onSurfaceVariant,
            fontSize: 10,
          }}
          yAxisLabelSuffix=" t"
          formatYLabel={(label: string) => formatTonnes(Number(label) * 1000)}
          noOfSections={4}
        />

        {/* gifted-charts' own focus strip is only as wide as each point's
            tiny drawn dot. This overlay instead gives each point the full
            width available to it, so selecting one doesn't require pixel
            precision. */}
        {isSelectable && (
          <View
            pointerEvents="box-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: totalChartWidth,
              height: chartHeight,
            }}
          >
            {points.map((point, index) => {
              const center =
                yAxisLabelWidth + initialSpacing + index * pointSpacing;
              const left = Math.max(0, center - pointSpacing / 2);
              const right = Math.min(
                totalChartWidth,
                center + pointSpacing / 2,
              );

              return (
                <Pressable
                  key={point.date}
                  onPress={() => onSelectPoint(point.date)}
                  accessibilityRole="button"
                  accessibilityLabel={t("history.selectPoint", {
                    date: formatLongDate(point.date),
                  })}
                  style={{
                    position: "absolute",
                    top: 0,
                    left,
                    width: right - left,
                    height: chartHeight,
                  }}
                />
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};
