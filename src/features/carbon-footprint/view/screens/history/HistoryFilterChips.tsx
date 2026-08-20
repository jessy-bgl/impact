import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Chip, useTheme } from "react-native-paper";

import { footprintCategories } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { categoryStyles } from "@carbonFootprint/view/screens/history/historyFormat";

type Props = {
  filter: HistoryFilter;
  onSelect: (filter: HistoryFilter) => void;
};

export const HistoryFilterChips = ({ filter, onSelect }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const chipColor = (value: HistoryFilter) =>
    value === "all" ? colors.primary : categoryStyles[value].color;

  const renderChip = (value: HistoryFilter, label: string) => {
    const selected = filter === value;
    const color = chipColor(value);

    return (
      <Chip
        key={value}
        selected={selected}
        showSelectedOverlay={false}
        onPress={() => onSelect(value)}
        style={{
          backgroundColor: selected ? color : "transparent",
          borderColor: color,
          borderWidth: 1,
        }}
        textStyle={{ color: selected ? colors.background : colors.onSurface }}
      >
        {label}
      </Chip>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      {renderChip("all", t("history.allFilter"))}
      {footprintCategories.map((category) =>
        renderChip(
          category,
          `${categoryStyles[category].icon} ${t(`categories.${category}`)}`,
        ),
      )}
    </View>
  );
};
