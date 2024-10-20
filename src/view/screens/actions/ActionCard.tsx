import { Card, useTheme } from "react-native-paper";

import { Action, ActionState } from "@domain/entities/action/Action";
import { ActionCardButtons } from "@view/screens/actions/ActionCardButtons";
import { ActionCardCategoryIcon } from "@view/screens/actions/ActionCardCategoryIcon";
import { ActionCardContent } from "@view/screens/actions/ActionCardContent";
import { ActionCardTitle } from "@view/screens/actions/ActionCardTitle";
import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

type Props = {
  action: Action;
  updateState: (newState: ActionState) => void;
  footprintViewModel: FootprintCategoryViewModel;
};

export const ActionCard = ({
  action,
  updateState,
  footprintViewModel,
}: Props) => {
  const { roundness } = useTheme();

  const savedFootprintPart = Math.floor(
    (action.savedFootprint / footprintViewModel.totalFootprint) * 100,
  );

  return (
    <Card
      style={{
        borderColor: footprintViewModel.color,
        borderRadius: roundness,
        width: 250,
        borderWidth: 1,
        opacity: action.state === "skipped" ? 0.7 : 1,
      }}
    >
      <ActionCardTitle
        action={action}
        footprintViewModel={footprintViewModel}
      />
      <ActionCardContent
        action={action}
        savedFootprintPart={savedFootprintPart}
        footprintViewModel={footprintViewModel}
      />
      <ActionCardCategoryIcon
        color={footprintViewModel.color}
        icon={footprintViewModel.materialIcon}
      />
      <ActionCardButtons actionState={action.state} updateState={updateState} />
    </Card>
  );
};
