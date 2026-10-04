import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon, Text, TouchableRipple, useTheme } from "react-native-paper";

import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { categoryIcons } from "@carbonFootprint/domain/entities/footprints/categoryIcons";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import {
  HistoryFilterSheet,
  useHistoryFilterLabel,
} from "@carbonFootprint/view/screens/history/HistoryFilterSheet";
import { filterColor } from "@carbonFootprint/view/screens/history/historyFormat";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";

const height = 40;

type Props = {
  filter: HistoryFilter;
  onSelect: (filter: HistoryFilter) => void;
};

export const HistoryFilterButton = ({ filter, onSelect }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();
  const { present, dismiss } = useCustomBottomSheetModal();

  const label = useHistoryFilterLabel();

  const color = filterColor(filter, colors.primary, useCategoryPalette());

  const openSheet = () =>
    present(
      <HistoryFilterSheet
        filter={filter}
        onSelect={(next) => {
          onSelect(next);
          dismiss();
        }}
      />,
    );

  return (
    <TouchableRipple
      onPress={openSheet}
      accessibilityRole="button"
      accessibilityLabel={t("history.filterA11y", { filter: label(filter) })}
      borderless
      style={{ borderRadius: height / 2 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          height,
          paddingLeft: filter === "all" ? 16 : 8,
          paddingRight: 12,
          borderRadius: height / 2,
          borderWidth: 1,
          borderColor: color,
        }}
      >
        {filter !== "all" && (
          <CategoryBadge color={color} icon={categoryIcons[filter]} size={24} />
        )}
        <Text variant="labelLarge">{label(filter)}</Text>
        <Icon source="chevron-down" size={18} color={colors.onSurfaceVariant} />
      </View>
    </TouchableRipple>
  );
};
