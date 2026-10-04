import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Card, Divider, Text, useTheme } from "react-native-paper";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { HistoryVariation } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { HistoryTrendLine } from "@carbonFootprint/view/screens/history/HistoryTrendLine";
import { formatLongDate } from "@carbonFootprint/view/screens/history/historyFormat";
import { OutlinedCard } from "@common/components/OutlinedCard";
import { formatTonnes } from "@common/utils/formatTonnes";

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

  const palette = useCategoryPalette();

  return (
    <OutlinedCard style={{ marginHorizontal: 16 }}>
      <Card.Content style={{ gap: 4 }}>
        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {formatLongDate(date)}
        </Text>

        <Text variant="titleLarge">
          {`${formatTonnes(value)} ${t("common:footprintTonnesPerYear")}`}
        </Text>

        <HistoryTrendLine variation={variation} />

        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {t("history.comparedToCurrent")}
        </Text>

        {breakdown && <Divider style={{ marginVertical: 12 }} />}

        {breakdown &&
          categoryOrder
            .map((category) => breakdown[category])
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
                  color={palette[category.styleKey]}
                  label={`${category.part}%`}
                  fontSize={12}
                />

                <Text style={{ flex: 1 }}>
                  {t(`categories.${category.category}`)}
                </Text>

                <Text variant="bodyMedium">
                  {`${formatTonnes(category.footprint)} ${t("common:footprintTonnes")}`}
                </Text>
              </View>
            ))}
      </Card.Content>

      <Card.Actions>
        <Button onPress={onClearSelection} mode="text">
          {t("history.backToCurrentDate")}
        </Button>
      </Card.Actions>
    </OutlinedCard>
  );
};
