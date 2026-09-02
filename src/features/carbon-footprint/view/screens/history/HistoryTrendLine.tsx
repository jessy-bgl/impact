import { useTranslation } from "react-i18next";
import { Text, useTheme } from "react-native-paper";

import { HistoryVariation } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { formatSignedTonnes } from "@carbonFootprint/view/screens/history/historyFormat";

type Props = {
  variation: HistoryVariation;
};

/** The one-line "▼ −0,70 t (6 %)" verdict, shared by both history cards. */
export const HistoryTrendLine = ({ variation }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const color = {
    down: colors.primary,
    up: colors.error,
    stable: colors.onSurfaceVariant,
  }[variation.trend];

  const icon = { down: "▼", up: "▲", stable: "=" }[variation.trend];

  return (
    <Text variant="titleMedium" style={{ color }}>
      {variation.trend === "stable"
        ? t("history.stable")
        : `${icon} ${formatSignedTonnes(variation.deltaKg)} t (${variation.percentage} %)`}
    </Text>
  );
};
