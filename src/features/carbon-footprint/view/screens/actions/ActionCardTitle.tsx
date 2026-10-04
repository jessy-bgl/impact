import { Card } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";

type Props = {
  action: Action;
  footprintViewModel: FootprintCategoryViewModel;
};

export const ActionCardTitle = ({ footprintViewModel, action }: Props) => {
  const palette = useCategoryPalette();

  return (
    <Card.Title
      title={action.label}
      titleNumberOfLines={3}
      titleVariant="titleMedium"
      titleStyle={{
        color: palette[footprintViewModel.styleKey],
        textAlign: "center",
      }}
      style={{ paddingTop: 5 }}
    />
  );
};
