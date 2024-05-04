import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const EmissionsTitle = () => {
  const { t } = useTranslation("emissions");

  return (
    <Text variant="titleLarge" style={{ textAlign: "center" }}>
      {t("impactDistributionTitle")}
    </Text>
  );
};
