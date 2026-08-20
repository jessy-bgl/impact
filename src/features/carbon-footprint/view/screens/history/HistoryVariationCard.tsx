import { useTranslation } from "react-i18next";
import { Card, Text, useTheme } from "react-native-paper";

import { HistoryVariation } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import {
  formatDeltaTonnes,
  formatLongDate,
  formatTonnes,
} from "@carbonFootprint/view/screens/history/historyFormat";

type Props = {
  currentValue: number;
  variation: HistoryVariation;
};

export const HistoryVariationCard = ({ currentValue, variation }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const trendColor = {
    down: colors.primary,
    up: colors.error,
    stable: colors.onSurfaceVariant,
  }[variation.trend];

  const trendIcon = { down: "▼", up: "▲", stable: "=" }[variation.trend];

  return (
    <Card mode="outlined" style={{ marginHorizontal: 16 }}>
      <Card.Content style={{ gap: 4 }}>
        <Text variant="titleLarge">
          {`${formatTonnes(currentValue)} ${t("history.perYear")}`}
        </Text>

        <Text variant="titleMedium" style={{ color: trendColor }}>
          {variation.trend === "stable"
            ? t("history.stable")
            : `${trendIcon} ${formatDeltaTonnes(variation.deltaKg)} t (${variation.percentage} %)`}
        </Text>

        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {t("history.since", { date: formatLongDate(variation.fromDate) })}
        </Text>
      </Card.Content>
    </Card>
  );
};
