import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { isCategoryCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { useAppStore } from "@common/store/useStore";
import { formatTonnes } from "@common/utils/formatTonnes";
import { Skeleton } from "moti/skeleton";

type Props = {
  isLoading: boolean;
  footprints: FootprintViewModels;
};

export const EmissionsDataTable = ({ footprints, isLoading }: Props) => {
  const { t } = useTranslation(["emissions", "common"]);

  const { colors, dark } = useTheme();

  const profileCompletion = useAppStore((state) => state.profile.completion);

  const palette = useCategoryPalette();

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{t("category")}</DataTable.Title>
        <DataTable.Title numeric>{t("annualFootprint")}</DataTable.Title>
      </DataTable.Header>

      {/* Ranked by impact, the heaviest first; ties keep the donut's order. */}
      {categoryOrder
        .map((category) => footprints[category])
        .sort((a, b) => b.footprint - a.footprint)
        .map((emissionsCategory) => {
          const isCompleted = isCategoryCompleted(
            profileCompletion,
            emissionsCategory.category,
          );
          if (isLoading)
            return (
              <DataTable.Row key={emissionsCategory.category}>
                <DataTable.Cell>
                  <Skeleton colorMode={dark ? "dark" : "light"} width="100%" />
                </DataTable.Cell>
              </DataTable.Row>
            );
          return (
            <DataTable.Row key={emissionsCategory.category}>
              <DataTable.Cell>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <CategoryBadge
                    color={palette[emissionsCategory.styleKey]}
                    label={`${emissionsCategory.part}%`}
                    fontSize={12}
                  />
                  <View style={{ flexDirection: "column", gap: 2 }}>
                    <Text>{t(`categories.${emissionsCategory.category}`)}</Text>
                    {!isCompleted && (
                      <Text
                        variant="labelSmall"
                        style={{ color: colors.error }}
                      >
                        {t(`common:toComplete`)}
                      </Text>
                    )}
                  </View>
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {formatTonnes(emissionsCategory.footprint)}{" "}
                {t("common:footprintTonnes")}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
    </DataTable>
  );
};
