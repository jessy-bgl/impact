import { useTranslation } from "react-i18next";
import { Button, useTheme } from "react-native-paper";

export const EmissionsEstimationButton = () => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  return (
    <Button
      icon="grass"
      mode="contained"
      textColor="white"
      contentStyle={{ height: 45 }}
      labelStyle={{ color: colors.onPrimary }}
    >
      {t("estimate")}
    </Button>
  );
};
