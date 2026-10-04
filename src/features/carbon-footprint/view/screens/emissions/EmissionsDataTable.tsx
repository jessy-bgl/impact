import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { DataTable, Icon, Text, useTheme } from "react-native-paper";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { isCategoryCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useProfileCompletion } from "@carbonFootprint/domain/hooks/useProfileCompletion";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { useOpenCategoryProfile } from "@carbonFootprint/view/hooks/useOpenCategoryProfile";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { CompletionStatus } from "@carbonFootprint/view/components/CompletionStatus";
import { formatTonnes } from "@common/utils/formatTonnes";
import { Skeleton } from "moti/skeleton";

type Props = {
  isLoading: boolean;
  footprints: FootprintViewModels;
};

export const EmissionsDataTable = ({ footprints, isLoading }: Props) => {
  const { t } = useTranslation(["emissions", "common"]);

  const { colors, dark } = useTheme();

  const openCategory = useOpenCategoryProfile();

  const profileCompletion = useProfileCompletion();

  const palette = useCategoryPalette();

  return (
    <DataTable>
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
          const categoryName = t(`categories.${emissionsCategory.category}`);
          const fill = palette[emissionsCategory.styleKey];
          const tonnes = formatTonnes(emissionsCategory.footprint);
          const footprint = `${tonnes} ${t("common:footprintTonnes")}`;
          return (
            <DataTable.Row
              key={emissionsCategory.category}
              onPress={() => openCategory(emissionsCategory.category)}
              accessibilityRole="button"
              accessibilityLabel={[
                categoryName,
                `${emissionsCategory.part}%`,
                t("common:footprintTonnesPerYearA11y", { value: tonnes }),
                ...(isCompleted ? [] : [t("common:toComplete")]),
              ].join(", ")}
            >
              <DataTable.Cell style={{ flex: 3 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <CategoryBadge
                    color={fill}
                    label={`${emissionsCategory.part}%`}
                    fontSize={12}
                  />
                  {/* Baseline, not center: the two sizes would sit off. Wraps
                      the status under the name when the row runs short, which
                      takes a width set by the row, not by the content. */}
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      columnGap: 10,
                      flex: 1,
                    }}
                  >
                    <Text>{categoryName}</Text>
                    {!isCompleted && <CompletionStatus isCompleted={false} />}
                  </View>
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric>{footprint}</DataTable.Cell>
              <View style={{ justifyContent: "center", marginLeft: 4 }}>
                <Icon
                  source="chevron-right"
                  size={20}
                  color={colors.onSurfaceVariant}
                />
              </View>
            </DataTable.Row>
          );
        })}
    </DataTable>
  );
};
