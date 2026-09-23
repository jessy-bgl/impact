import { View } from "react-native";
import { Card, useTheme } from "react-native-paper";

import {
  Action,
  ActionState,
} from "@carbonFootprint/domain/entities/action/Action";
import { ACTIONS_TOUR_TARGETS } from "@carbonFootprint/domain/entities/tour/actionsTour";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { ActionCardButtons } from "@carbonFootprint/view/screens/actions/ActionCardButtons";
import { ActionCardCategory } from "@carbonFootprint/view/screens/actions/ActionCardCategory";
import { ActionCardContent } from "@carbonFootprint/view/screens/actions/ActionCardContent";
import { ActionCardTitle } from "@carbonFootprint/view/screens/actions/ActionCardTitle";
import { useTourTarget } from "@common/tour/useTourTarget";

type Props = {
  action: Action;
  updateState: (newState: ActionState) => void;
  isTourTarget?: boolean;
};

export const ActionCard = ({
  action,
  updateState,
  isTourTarget = false,
}: Props) => {
  const { roundness } = useTheme();

  const { footprints } = useFootprints();

  const footprintViewModel = footprints[action.category];

  const tourOptions = { enabled: isTourTarget };
  const savingsTourRef = useTourTarget(
    ACTIONS_TOUR_TARGETS.savings,
    tourOptions,
  );
  const categoryTourRef = useTourTarget(
    ACTIONS_TOUR_TARGETS.category,
    tourOptions,
  );
  const buttonsTourRef = useTourTarget(
    ACTIONS_TOUR_TARGETS.buttons,
    tourOptions,
  );

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
        tourRef={savingsTourRef}
      />
      <ActionCardCategory
        action={action}
        footprintViewModel={footprintViewModel}
        tourRef={categoryTourRef}
      />
      <View ref={buttonsTourRef} collapsable={false}>
        <ActionCardButtons
          actionState={action.state}
          updateState={updateState}
        />
      </View>
    </Card>
  );
};
