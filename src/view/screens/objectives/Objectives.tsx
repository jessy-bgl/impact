import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const Objectives = () => {
  const { t } = useTranslation(["common"]);

  return (
    <Text style={{ textAlign: "center", marginTop: 10 }}>
      {t("comingSoon")}
    </Text>
  );
};
