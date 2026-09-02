import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import { footprintCategories } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { CategoryBadge } from "@carbonFootprint/view/screens/history/CategoryBadge";
import {
  categoryStyles,
  filterColor,
} from "@carbonFootprint/view/screens/history/historyFormat";

const rowHeight = 48;

export const historyFilters: HistoryFilter[] = ["all", ...footprintCategories];

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
            // Without it the name would also carry the badge's emoji.
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
              color={filterColor(value, colors.primary)}
              label={value === "all" ? "∑" : categoryStyles[value].icon}
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
