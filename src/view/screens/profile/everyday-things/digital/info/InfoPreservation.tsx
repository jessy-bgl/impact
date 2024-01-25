import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoPreservation = () => {
  const { t } = useTranslation("infoEverydayThings");

  return (
    <>
      <Text>{t("digital.preservation.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("digital.preservation.p2")}</Text>
    </>
  );
};
