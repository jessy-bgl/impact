import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import { Action } from "@domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

type Props = {
  action: Action;
  savedFootprintPart: number;
  footprintViewModel: FootprintCategoryViewModel;
};

export const ActionCardContent = ({
  action,
  savedFootprintPart,
  footprintViewModel,
}: Props) => {
  const { colors, roundness } = useTheme();

  const { t } = useTranslation(["common", "actions"]);

  return (
    <Card.Content
      style={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        height: 60,
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          backgroundColor: footprintViewModel.color,
          borderRadius: roundness,
          padding: 5,
        }}
      >
        <Icon source="arrow-down" size={20} color={colors.surface} />
        <Text style={{ color: colors.surface, marginBottom: 2 }}>
          {savedFootprintPart}%
        </Text>
      </View>
      <View>
        <Text>{`- ${action.savedFootprint} ${t("footprintKg")}`}</Text>
      </View>
    </Card.Content>
  );
};
