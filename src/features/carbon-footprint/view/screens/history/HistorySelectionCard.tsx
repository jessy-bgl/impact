import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Card, Divider, Text, useTheme } from "react-native-paper";

import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { HistoryVariation } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { CategoryBadge } from "@carbonFootprint/view/screens/history/CategoryBadge";
import { HistoryTrendLine } from "@carbonFootprint/view/screens/history/HistoryTrendLine";
import {
  formatLongDate,
  formatTonnes,
} from "@carbonFootprint/view/screens/history/historyFormat";

type Props = {
  date: string;
  value: number;
  /** The selected value read against today, so the sign describes that date. */
  variation: HistoryVariation;
  /** `null` under a category filter: only the total splits into categories. */
  breakdown: FootprintViewModels | null;
  onClearSelection: () => void;
};

/**
 * Everything the selected point has to say, in one card: its value, how today
 * compares to it, and — for the total — the category split it was made of.
 */
export const HistorySelectionCard = ({
  date,
  value,
  variation,
  breakdown,
  onClearSelection,
}: Props) => {
  const { t } = useTranslation(["emissions", "common"]);
  const { colors } = useTheme();

  return (
    <Card mode="outlined" style={{ marginHorizontal: 16 }}>
      <Card.Content style={{ gap: 4 }}>
        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {formatLongDate(date)}
        </Text>

        <Text variant="titleLarge">
          {`${formatTonnes(value)} ${t("history.perYear")}`}
        </Text>

        <HistoryTrendLine variation={variation} />

        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {t("history.comparedToCurrent")}
        </Text>

        {breakdown && <Divider style={{ marginVertical: 12 }} />}

        {Object.values(breakdown ?? {})
          .sort((a, b) => b.footprint - a.footprint)
          .map((category) => (
            <View
              key={category.category}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingVertical: 4,
              }}
            >
              <CategoryBadge
                color={category.color}
                label={`${category.part}%`}
                fontSize={12}
              />

              <Text style={{ flex: 1 }}>
                {t(`categories.${category.category}`)}
              </Text>

              <Text variant="bodyMedium">
                {`${category.footprint} ${t("common:footprintKg")}`}
              </Text>
            </View>
          ))}
      </Card.Content>

      <Card.Actions>
        <Button onPress={onClearSelection} mode="text">
          {t("history.backToCurrentDate")}
        </Button>
      </Card.Actions>
    </Card>
  );
};
