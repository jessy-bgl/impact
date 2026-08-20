import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { formatLongDate } from "@carbonFootprint/view/screens/history/historyFormat";

const badgeSize = 32;

type Props = {
  breakdown: FootprintViewModels;
  date: string;
};

export const HistoryBreakdown = ({ breakdown, date }: Props) => {
  const { t } = useTranslation(["emissions", "common"]);
  const { colors } = useTheme();

  return (
    <Card mode="outlined" style={{ marginHorizontal: 16 }}>
      <Card.Content style={{ gap: 12 }}>
        <Text variant="titleSmall">
          {t("history.breakdownTitle", { date: formatLongDate(date) })}
        </Text>

        {Object.values(breakdown)
          .sort((a, b) => b.footprint - a.footprint)
          .map((category) => (
            <View
              key={category.category}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: badgeSize,
                  height: badgeSize,
                  borderRadius: badgeSize / 2,
                  backgroundColor: category.color,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colors.background, fontSize: 12 }}>
                  {category.part}%
                </Text>
              </View>

              <Text style={{ flex: 1 }}>
                {t(`categories.${category.category}`)}
              </Text>

              <Text variant="bodyMedium">
                {`${category.footprint} ${t("common:footprintKg")}`}
              </Text>
            </View>
          ))}
      </Card.Content>
    </Card>
  );
};
