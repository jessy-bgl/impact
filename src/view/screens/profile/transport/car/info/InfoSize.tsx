import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoSize = () => {
  const { t } = useTranslation("infoTransport");

  return (
    <>
      <Text>{t("car.size.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.size.p2")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.size.p3")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.size.p4")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.size.p5")}</Text>
    </>
  );
};
