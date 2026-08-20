import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import { formatTonnes } from "@carbonFootprint/view/screens/history/historyFormat";

type Props = {
  /** Set once the profile is complete but a single snapshot has been recorded. */
  loneValue: number | null;
};

export const HistoryEmptyState = ({ loneValue }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();
  const { navigate } = useNavigation<EmissionsNavigatorProp>();

  const key = loneValue === null ? "incompleteProfile" : "singleSnapshot";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 32,
        paddingVertical: 48,
      }}
    >
      <Text variant="titleMedium" style={{ textAlign: "center" }}>
        {t(`history.${key}.title`)}
      </Text>

      {loneValue !== null && (
        <Text variant="displaySmall" style={{ color: colors.primary }}>
          {`${formatTonnes(loneValue)} ${t("history.perYear")}`}
        </Text>
      )}

      <Text
        variant="bodyMedium"
        style={{ textAlign: "center", color: colors.onSurfaceVariant }}
      >
        {t(`history.${key}.subtitle`)}
      </Text>

      {loneValue === null && (
        <Button
          icon="grass"
          mode="outlined"
          labelStyle={{ color: colors.primary, fontWeight: "bold" }}
          style={{ borderColor: colors.primary, marginTop: 8 }}
          onPress={() => navigate("Profile")}
        >
          {t("history.incompleteProfile.cta")}
        </Button>
      )}
    </View>
  );
};
