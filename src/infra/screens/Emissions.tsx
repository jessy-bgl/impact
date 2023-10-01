import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const Emissions = () => {
  const { t } = useTranslation("common");

  return <Text>{t("emissions")}</Text>;
};
