import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import {
  FrenchAverageComparison as Comparison,
  FrenchAverageComparisonViewModel,
} from "@carbonFootprint/domain/entities/FrenchAverageComparisonViewModel";

type Props = {
  myFootprint: number;
  averageFootprint: number;
};

const formatTonnes = (footprint: number) =>
  `${(footprint / 1000).toFixed(2)} tCO2e`;

export const FrenchAverageComparison = ({
  myFootprint,
  averageFootprint,
}: Props) => {
  const { t } = useTranslation("emissions");

  const { colors } = useTheme();

  const comparison = FrenchAverageComparisonViewModel.from(
    myFootprint,
    averageFootprint,
  );

  if (!comparison.isComparable) return null;

  const deltaColors: Record<Comparison, string> = {
    above: colors.error,
    below: colors.primary,
    equal: colors.onSurfaceVariant,
  };

  const bar = (
    label: string,
    footprint: number,
    part: number,
    color: string,
  ) => (
    <View style={styles.bar}>
      <View style={styles.barLabels}>
        <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
          {label}
        </Text>
        <Text variant="bodyMedium" style={{ color }}>
          {formatTonnes(footprint)}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.surfaceVariant }]}>
        <View
          style={[styles.fill, { width: `${part}%`, backgroundColor: color }]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {bar(
        t("profileCompleted.frenchAverage.mine"),
        comparison.myFootprint,
        comparison.myBarPart,
        colors.primary,
      )}
      {bar(
        t("profileCompleted.frenchAverage.average"),
        comparison.averageFootprint,
        comparison.averageBarPart,
        colors.outline,
      )}
      <Text
        variant="bodyMedium"
        style={{
          ...styles.centeredText,
          color: deltaColors[comparison.comparison],
        }}
      >
        {t(`profileCompleted.frenchAverage.${comparison.comparison}`, {
          percentage: comparison.deltaPercentage,
        })}
      </Text>
      <Text
        variant="labelSmall"
        style={{ ...styles.centeredText, color: colors.onSurfaceVariant }}
      >
        {t("profileCompleted.frenchAverage.source")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8 },
  centeredText: { textAlign: "center" },
  bar: { gap: 4 },
  barLabels: { flexDirection: "row", justifyContent: "space-between" },
  track: { height: 14, borderRadius: 7, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 7 },
});
