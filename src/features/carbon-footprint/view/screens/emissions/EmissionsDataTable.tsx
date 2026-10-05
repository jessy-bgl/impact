import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { isCategoryCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useProfileCompletion } from "@carbonFootprint/domain/hooks/useProfileCompletion";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { CompletionStatus } from "@carbonFootprint/view/components/CompletionStatus";
import { useOpenCategoryProfile } from "@carbonFootprint/view/hooks/useOpenCategoryProfile";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
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
                  <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <Text>{categoryName}</Text>
                    {!isCompleted && <CompletionStatus isCompleted={false} />}
                  </View>
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 0, marginLeft: 12 }}>
                <View style={{ alignItems: "flex-end" }}>
                  <Text>{tonnes}</Text>
                  <Text
                    variant="labelSmall"
                    style={{ color: colors.onSurfaceVariant }}
                  >
                    {t("common:footprintTonnesPerYear")}
                  </Text>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
    </DataTable>
  );
};
