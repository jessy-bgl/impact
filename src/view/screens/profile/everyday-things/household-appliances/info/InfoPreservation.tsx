import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoPreservation = () => {
  const { t } = useTranslation("infoEverydayThings");

  return (
    <>
      <Text>{t("householdAppliances.preservation.p1")}</Text>
      <Text style={{ marginTop: 10 }}>
        {t("householdAppliances.preservation.p2")}
      </Text>
      <Text style={{ marginTop: 10 }}>
        {t("householdAppliances.preservation.p3")}
      </Text>
    </>
  );
};
