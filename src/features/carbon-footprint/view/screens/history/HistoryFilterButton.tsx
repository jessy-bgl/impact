import { useTranslation } from "react-i18next";
import { Button, useTheme } from "react-native-paper";

import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import {
  HistoryFilterSheet,
  useHistoryFilterLabel,
} from "@carbonFootprint/view/screens/history/HistoryFilterSheet";
import {
  categoryStyles,
  filterColor,
} from "@carbonFootprint/view/screens/history/historyFormat";
import { useCustomBottomSheetModal } from "@common/context/BottomSheetContext";

type Props = {
  filter: HistoryFilter;
  onSelect: (filter: HistoryFilter) => void;
};

export const HistoryFilterButton = ({ filter, onSelect }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();
  const { present, dismiss } = useCustomBottomSheetModal();

  const label = useHistoryFilterLabel();

  const color = filterColor(filter, colors.primary);

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
    <Button
      compact
      mode="outlined"
      icon="chevron-down"
      onPress={openSheet}
      accessibilityLabel={t("history.filterA11y", { filter: label(filter) })}
      textColor={colors.onSurface}
      style={{ borderColor: color }}
      // The chevron belongs after the label: it announces the sheet, it does not
      // stand for the filter — the category emoji does.
      contentStyle={{ flexDirection: "row-reverse" }}
      labelStyle={{ marginHorizontal: 8 }}
    >
      {filter === "all"
        ? label(filter)
        : `${categoryStyles[filter].icon} ${label(filter)}`}
    </Button>
  );
};
