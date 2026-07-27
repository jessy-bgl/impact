import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "react-native-paper";

import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import { posthog } from "@common/config/posthog";

export const EmissionsEstimationButton = () => {
  const { t } = useTranslation("emissions");

  const { colors } = useTheme();

  const { navigate } = useNavigation<EmissionsNavigatorProp>();

  return (
    <Button
      icon="grass"
      mode="outlined"
      contentStyle={{ height: 48 }}
      labelStyle={{ color: colors.primary, fontWeight: "bold" }}
      style={{ borderColor: colors.primary }}
      onPress={() => {
        posthog.capture("footprint_estimation_started");
        navigate("Profile");
      }}
    >
      {t("estimate")}
    </Button>
  );
};
