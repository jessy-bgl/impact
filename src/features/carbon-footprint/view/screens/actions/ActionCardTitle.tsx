import { Card } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/FootprintViewModel";

type Props = {
  action: Action;
  footprintViewModel: FootprintCategoryViewModel;
};

export const ActionCardTitle = ({ footprintViewModel, action }: Props) => {
  return (
    <Card.Title
      title={action.label}
      titleNumberOfLines={3}
      titleVariant="titleMedium"
      titleStyle={{
        color: footprintViewModel.color,
        textAlign: "center",
      }}
      style={{ paddingTop: 5 }}
    />
  );
};
