import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const EmissionsTitle = () => {
  const { t } = useTranslation("emissions");

  return (
    <Text variant="titleLarge" style={{ paddingTop: 10, textAlign: "center" }}>
      {t("impactDistributionTitle")}
    </Text>
  );
};
