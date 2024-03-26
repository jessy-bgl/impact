import { Card, IconButton } from "react-native-paper";

import { ActionState } from "@domain/entities/actions/Action";

type Props = {
  actionState: ActionState;
  updateState: (newState: ActionState) => void;
};

export const ActionCardButtons = ({ actionState, updateState }: Props) => {
  if (actionState === "completed") return;

  if (actionState === "notStarted")
    return (
      <Card.Actions>
        <IconButton icon="cancel" onPress={() => updateState("skipped")} />
        <IconButton
          icon="check-outline"
          onPress={() => updateState("inProgress")}
        />
      </Card.Actions>
    );

  if (actionState === "inProgress")
    return (
      <Card.Actions>
        <IconButton icon="close" onPress={() => updateState("notStarted")} />
      </Card.Actions>
    );

  if (actionState === "skipped")
    return (
      <Card.Actions>
        <IconButton icon="restore" onPress={() => updateState("notStarted")} />
      </Card.Actions>
    );
};
