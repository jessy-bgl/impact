import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const Info = () => {
  const { t } = useTranslation("infoEverydayThings");

  return (
    <>
      <Text>{t("otherProducts.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("otherProducts.p2")}</Text>
      <Text style={{ marginTop: 10 }}>{t("otherProducts.p3")}</Text>
    </>
  );
};
