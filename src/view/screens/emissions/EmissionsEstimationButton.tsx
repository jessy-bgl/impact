import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "react-native-paper";

import { AppNavigationProp } from "@common/AppNavigation";

export const EmissionsEstimationButton = () => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigationProp>();

  return (
    <Button
      icon="grass"
      mode="contained"
      textColor="white"
      contentStyle={{ height: 45 }}
      labelStyle={{ color: colors.onPrimary }}
      onPress={() => navigate("Profile")}
    >
      {t("estimate")}
    </Button>
  );
};
