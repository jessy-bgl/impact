import { View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import { Action } from "@domain/entities/actions/Action";
import { useActionStyles } from "@view/screens/actions/useActionStyles";
import { useTranslation } from "react-i18next";

type Props = {
  action: Action;
  savedFootprintPart: number;
};

export const ActionCardContent = ({ action, savedFootprintPart }: Props) => {
  const styles = useActionStyles();
  const { colors } = useTheme();
  const { t } = useTranslation(["common", "actions"]);

  const { state, savedFootprint } = action;

  return (
    <Card.Content style={styles[state].content}>
      {state !== "completed" ? (
        <>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Icon source="arrow-down" color={colors.primary} size={20} />
          </View>
          <View style={{ justifyContent: "center", gap: 5 }}>
            <Text>{savedFootprintPart}%</Text>
            <Text>{`${savedFootprint} ${t("footprintKg")}`}</Text>
          </View>
        </>
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>{t("actions:completed")}</Text>
        </View>
      )}
    </Card.Content>
  );
};
