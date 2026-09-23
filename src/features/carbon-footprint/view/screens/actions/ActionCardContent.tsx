import { Ref } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";

type Props = {
  action: Action;
  savedFootprintPart: number;
  footprintViewModel: FootprintCategoryViewModel;
  tourRef?: Ref<View>;
};

export const ActionCardContent = ({
  action,
  savedFootprintPart,
  footprintViewModel,
  tourRef,
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
      {/* Wrapped rather than anchored on Card.Content, which the Card lays
      out from props it passes down to its direct children. */}
      <View
        ref={tourRef}
        collapsable={false}
        style={{ alignItems: "center", gap: 10 }}
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
      </View>
    </Card.Content>
  );
};
