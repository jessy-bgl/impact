import { Button, ButtonProps, Card, Icon, useTheme } from "react-native-paper";

import { ActionState } from "@domain/entities/action/Action";

type Props = {
  actionState: ActionState;
  updateState: (newState: ActionState) => void;
};

export const ActionCardButtons = ({ actionState, updateState }: Props) => {
  const { colors } = useTheme();

  const buttonStyle: ButtonProps["style"] = {
    borderStyle: "solid",
    borderWidth: 1,
    height: 37,
    justifyContent: "center",
  };

  const iconSize = 20;

  if (actionState === "notStarted")
    return (
      <Card.Actions>
        <Button onPress={() => updateState("skipped")} style={buttonStyle}>
          <Icon source="cancel" size={iconSize} />
        </Button>
        <Button
          onPress={() => updateState("inProgress")}
          style={{
            ...buttonStyle,
            borderColor: colors.primary,
          }}
          buttonColor={"transparent"}
        >
          <Icon source="check-outline" size={iconSize} color={colors.primary} />
        </Button>
      </Card.Actions>
    );

  if (actionState === "inProgress")
    return (
      <Card.Actions>
        <Button onPress={() => updateState("notStarted")} style={buttonStyle}>
          <Icon source="close" size={iconSize} />
        </Button>
      </Card.Actions>
    );

  if (actionState === "skipped")
    return (
      <Card.Actions>
        <Button onPress={() => updateState("notStarted")} style={buttonStyle}>
          <Icon source="restore" size={iconSize} />
        </Button>
      </Card.Actions>
    );
};
