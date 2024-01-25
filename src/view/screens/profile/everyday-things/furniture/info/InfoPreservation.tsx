import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoPreservation = () => {
  const { t } = useTranslation("infoEverydayThings");

  return (
    <>
      <Text>{t("furniture.preservation.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("furniture.preservation.p2")}</Text>
      <Text style={{ marginTop: 10 }}>{t("furniture.preservation.p3")}</Text>
    </>
  );
};
