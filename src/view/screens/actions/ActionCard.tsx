import { View } from "react-native";
import { Avatar, Card } from "react-native-paper";

import { Action, ActionState } from "@domain/entities/actions/Action";
import { ActionCardButtons } from "@view/screens/actions/ActionCardButtons";
import { ActionCardContent } from "@view/screens/actions/ActionCardContent";
import { useActionStyles } from "@view/screens/actions/useActionStyles";
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
  const { label, state } = action;

  const styles = useActionStyles();

  const savedFootprintPart = Math.floor(
    (action.savedFootprint / footprintViewModel.totalFootprint) * 100,
  );

  return (
    <Card style={styles[state].card}>
      <View style={{ height: state === "completed" ? 150 : 200 }}>
        <Card.Title
          title={label}
          titleNumberOfLines={2}
          titleVariant="titleSmall"
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={footprintViewModel.materialIcon}
              style={{ backgroundColor: footprintViewModel.color }}
            />
          )}
        />

        <ActionCardContent
          action={action}
          savedFootprintPart={savedFootprintPart}
        />

        <ActionCardButtons actionState={state} updateState={updateState} />
      </View>
    </Card>
  );
};
