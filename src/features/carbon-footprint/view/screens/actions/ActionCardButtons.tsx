import { useTranslation } from "react-i18next";
import { Button, Card, useTheme } from "react-native-paper";

import { ActionState } from "@carbonFootprint/domain/entities/action/Action";
import { posthog } from "@common/config/posthog";

type Props = {
  actionState: ActionState;
  updateState: (newState: ActionState) => void;
};

export const ActionCardButtons = ({ actionState, updateState }: Props) => {
  const { t } = useTranslation("actions");

  const { colors } = useTheme();

  if (actionState === "notStarted")
    return (
      <Card.Actions>
        <Button
          mode="text"
          textColor={colors.onSurfaceVariant}
          onPress={() => {
            posthog.capture("action_skipped");
            updateState("skipped");
          }}
        >
          {t("buttons.skip")}
        </Button>
        <Button
          mode="text"
          icon="check"
          onPress={() => {
            posthog.capture("action_started");
            updateState("inProgress");
          }}
        >
          {t("buttons.start")}
        </Button>
      </Card.Actions>
    );

  if (actionState === "inProgress")
    return (
      <Card.Actions>
        <Button
          mode="text"
          textColor={colors.onSurfaceVariant}
          onPress={() => {
            posthog.capture("action_reset", { previous_state: "inProgress" });
            updateState("notStarted");
          }}
        >
          {t("buttons.remove")}
        </Button>
      </Card.Actions>
    );

  return (
    <Card.Actions>
      <Button
        mode="text"
        icon="restore"
        onPress={() => {
          posthog.capture("action_reset", { previous_state: "skipped" });
          updateState("notStarted");
        }}
      >
        {t("buttons.restore")}
      </Button>
    </Card.Actions>
  );
};
