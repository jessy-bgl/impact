import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
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
const yAxisThickness = 1;
/** Widest short date ("12 sept") at the label font size, give or take. */
const xLabelWidth = 44;
/**
 * Every x label is centred on its point, so the last one spills half its width
 * past the plot — where the chart clips. This is that half.
 */
const endLabelMargin = xLabelWidth / 2;
/**
 * The first label needs the same half, but half alone leaves the line starting
 * flush against the y axis, so the first point gets a whole label of room.
 */
const initialSpacing = xLabelWidth;
export const maxHistoryContentWidth = yAxisLabelWidth + maxChartWidth;

/** Past this, points are too cramped to be readable, so the chart scrolls. */
export const maxVisiblePoints = 6;

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
  const scrollRef = useRef<ScrollView>(null);

  const color = filterColor(filter, colors.primary);

  const availableWidth = width - horizontalPadding * 2;
  const plotWidth = Math.min(availableWidth - yAxisLabelWidth, maxChartWidth);
  const chartWidth = plotWidth - endLabelMargin;
  const visibleWidth = yAxisLabelWidth + plotWidth;
  // Where the chart draws its axis line, hence where the pinned column ends
  // and the scrolling plot begins.
  const axisColumnWidth = yAxisLabelWidth + yAxisThickness;

  // Spacing is set by the widest readable point count, not by the data: past
  // `maxVisiblePoints` the extra points spill outside the viewport instead of
  // squeezing the visible ones.
  const visiblePoints = Math.min(points.length, maxVisiblePoints);
  const pointSpacing =
    visiblePoints > 1 ? (chartWidth - initialSpacing) / (visiblePoints - 1) : 0;
  const plotContentWidth = initialSpacing + pointSpacing * (points.length - 1);
  // The chart clips its own plot to the `width` we hand it, and the last x
  // label is centred on the last point, so half of it sits past
  // `plotContentWidth`. `endLabelMargin` is that room.
  const chartContentWidth = plotContentWidth + endLabelMargin;
  const contentWidth = yAxisLabelWidth + chartContentWidth;

  const data = points.map((point) => ({
    value: point.value / 1000,
    label: formatShortDate(point.date),
    dataPointColor: point.date === selectedDate ? colors.onBackground : color,
    dataPointRadius: point.date === selectedDate ? 6 : 4,
  }));

  const chartProps = {
    data,
    width: chartContentWidth,
    height: chartHeight,
    yAxisLabelWidth,
    yAxisThickness,
    initialSpacing,
    spacing: pointSpacing,
    endSpacing: endLabelMargin,
    disableScroll: true,
    areaChart: true,
    curved: true,
    color,
    startFillColor: color,
    endFillColor: color,
    startOpacity: 0.35,
    endOpacity: 0.02,
    thickness: 2,
    hideDataPoints: false,
    dataPointsColor: color,
    yAxisColor: colors.outline,
    xAxisColor: colors.outline,
    rulesColor: colors.surfaceVariant,
    yAxisTextStyle: { color: colors.onSurfaceVariant, fontSize: 10 },
    xAxisLabelTextStyle: { color: colors.onSurfaceVariant, fontSize: 10 },
    yAxisLabelSuffix: " t",
    formatYLabel: (label: string) => formatTonnes(Number(label) * 1000),
    noOfSections: 4,
  };

  return (
    <View style={{ paddingHorizontal: horizontalPadding }}>
      {/* Safety net: even with `endLabelMargin` reserved, clip so nothing can
          ever escape the screen if the estimate is a few pixels short. */}
      <View style={{ width: visibleWidth, overflow: "hidden" }}>
        {/* The plot is shifted left by the width of the axis column and clipped
            back to it, so nothing scrolling can ever be drawn over the pinned
            axis — no reliance on it being painted opaquely on top. */}
        <View
          style={{
            marginLeft: axisColumnWidth,
            width: visibleWidth - axisColumnWidth,
            overflow: "hidden",
          }}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            // Scrolling here rather than through the chart's own scroll view:
            // that one wraps the plot only, leaving the selection overlay behind.
            scrollEnabled={contentWidth > visibleWidth}
            // The latest snapshot is the one worth landing on.
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: false })
            }
          >
            <View style={{ width: contentWidth, marginLeft: -axisColumnWidth }}>
              <LineChart {...chartProps} />

              {/* gifted-charts' own focus strip is only as wide as each point's
                tiny drawn dot. This overlay instead gives each point the full
                width available to it, so selecting one doesn't require pixel
                precision. */}
              <View
                pointerEvents="box-none"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: contentWidth,
                  height: chartHeight,
                }}
              >
                {points.map((point, index) => {
                  const center =
                    yAxisLabelWidth + initialSpacing + index * pointSpacing;
                  const left = Math.max(0, center - pointSpacing / 2);
                  const right = Math.min(
                    contentWidth,
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
            </View>
          </ScrollView>
        </View>

        {/* The y axis has to stay put while the plot scrolls under it, but
            gifted-charts draws its axis inside the chart. So we pin a second
            copy of the very same chart here, clipped to the axis column:
            identical props guarantee identical vertical geometry. */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: axisColumnWidth,
            overflow: "hidden",
            backgroundColor: colors.background,
          }}
        >
          <LineChart {...chartProps} />
        </View>
      </View>
    </View>
  );
};
