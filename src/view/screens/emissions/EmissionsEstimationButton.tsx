import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";

export const EmissionsEstimationButton = () => {
  const { t } = useTranslation("emissions");

  return (
    <Button
      icon="grass"
      mode="contained"
      textColor="white"
      contentStyle={{ height: 45 }}
      labelStyle={{ color: "black" }}
    >
      {t("estimate")}
    </Button>
  );
};
