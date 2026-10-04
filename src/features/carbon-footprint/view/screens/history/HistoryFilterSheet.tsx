import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { categoryIcons } from "@carbonFootprint/domain/entities/footprints/categoryIcons";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { filterColor } from "@carbonFootprint/view/screens/history/historyFormat";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";

const rowHeight = 48;

export const historyFilters: HistoryFilter[] = ["all", ...categoryOrder];

type Props = {
  filter: HistoryFilter;
  onSelect: (filter: HistoryFilter) => void;
};

export const useHistoryFilterLabel = () => {
  const { t } = useTranslation("emissions");

  return (filter: HistoryFilter) =>
    filter === "all" ? t("history.allFilter") : t(`categories.${filter}`);
};

export const HistoryFilterSheet = ({ filter, onSelect }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const palette = useCategoryPalette();

  const label = useHistoryFilterLabel();

  return (
    <View>
      <Text variant="titleSmall" style={{ marginBottom: 8 }}>
        {t("history.filterTitle")}
      </Text>

      {historyFilters.map((value) => {
        const selected = value === filter;

        return (
          <Pressable
            key={value}
            onPress={() => onSelect(value)}
            accessibilityRole="button"
            accessibilityLabel={label(value)}
            accessibilityState={{ selected }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              minHeight: rowHeight,
            }}
          >
            <CategoryBadge
              color={filterColor(value, colors.primary, palette)}
              icon={value === "all" ? "sigma" : categoryIcons[value]}
            />

            <Text
              style={{ flex: 1 }}
              variant={selected ? "titleSmall" : "bodyLarge"}
            >
              {label(value)}
            </Text>

            {selected && (
              <Icon source="check" size={20} color={colors.primary} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};
