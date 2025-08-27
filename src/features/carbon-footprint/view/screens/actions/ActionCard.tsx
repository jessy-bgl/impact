import { Card, useTheme } from "react-native-paper";

import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { ActionCardButtons } from "@carbonFootprint/view/screens/actions/ActionCardButtons";
import { ActionCardCategory } from "@carbonFootprint/view/screens/actions/ActionCardCategory";
import { ActionCardContent } from "@carbonFootprint/view/screens/actions/ActionCardContent";
import { ActionCardTitle } from "@carbonFootprint/view/screens/actions/ActionCardTitle";

type Props = {
  action: Action;
  updateState: (newState: ActionState) => void;
};

export const ActionCard = ({ action, updateState }: Props) => {
  const { roundness } = useTheme();

  const { footprints } = useFootprints();

  const footprintViewModel = footprints[action.category];

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
      <ActionCardCategory
        action={action}
        footprintViewModel={footprintViewModel}
      />
      <ActionCardButtons actionState={action.state} updateState={updateState} />
    </Card>
  );
};
