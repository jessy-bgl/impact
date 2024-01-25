import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoDiet = () => {
  const { t } = useTranslation("infoFood");

  return (
    <>
      <Text>{t("meals.vegan")}</Text>
      <Text style={{ marginTop: 10 }}>{t("meals.vegetarian")}</Text>
      <Text style={{ marginTop: 10 }}>{t("meals.littleMeatConsumer")}</Text>
      <Text style={{ marginTop: 10 }}>{t("meals.regularMeatConsumer")}</Text>
      <Text style={{ marginTop: 10 }}>{t("meals.heavyMeatConsumer")}</Text>
    </>
  );
};
