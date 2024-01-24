import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoSameCar = () => {
  const { t } = useTranslation("infoTransport");

  return (
    <>
      <Text>{t("car.sameCar.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.sameCar.p2")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.sameCar.p3")}</Text>
      <Text style={{ marginTop: 10 }}>{t("car.sameCar.p4")}</Text>
    </>
  );
};
