import { View } from "react-native";
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
    height: 40,
  };

  if (actionState === "notStarted")
    return (
      <Card.Actions>
        <Button onPress={() => updateState("skipped")} style={buttonStyle}>
          <IconView icon="cancel" />
        </Button>
        <Button
          onPress={() => updateState("inProgress")}
          style={{
            ...buttonStyle,
            borderColor: colors.primary,
          }}
          buttonColor={"transparent"}
        >
          <IconView icon="check-outline" color={colors.primary} />
        </Button>
      </Card.Actions>
    );

  if (actionState === "inProgress")
    return (
      <Card.Actions>
        <Button onPress={() => updateState("notStarted")} style={buttonStyle}>
          <IconView icon="close" />
        </Button>
      </Card.Actions>
    );

  if (actionState === "skipped")
    return (
      <Card.Actions>
        <Button onPress={() => updateState("notStarted")} style={buttonStyle}>
          <IconView icon="restore" />
        </Button>
      </Card.Actions>
    );
};

const IconView = ({ icon, color }: { icon: string; color?: string }) => {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Icon source={icon} size={19} color={color} />
    </View>
  );
};
