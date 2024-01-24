import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoDistance = () => {
  const { t } = useTranslation("infoTransport");

  return (
    <>
      <Text>{t("car.distance.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.distance.p2")}</Text>
    </>
  );
};
