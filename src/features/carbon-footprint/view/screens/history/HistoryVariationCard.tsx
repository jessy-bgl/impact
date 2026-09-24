import { useTranslation } from "react-i18next";
import { Card, Text, useTheme } from "react-native-paper";

import { HistoryVariation } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { HistoryTrendLine } from "@carbonFootprint/view/screens/history/HistoryTrendLine";
import {
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

  return (
    <Card mode="outlined" style={{ marginHorizontal: 16 }}>
      <Card.Content style={{ gap: 4 }}>
        <Text variant="titleLarge">
          {`${formatTonnes(currentValue)} ${t("history.perYear")}`}
        </Text>

        <HistoryTrendLine variation={variation} />

        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {t("history.since", { date: formatLongDate(variation.fromDate) })}
        </Text>
      </Card.Content>
    </Card>
  );
};
