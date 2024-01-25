import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

export const InfoOccupants = () => {
  const { t } = useTranslation("infoHousing");

  return (
    <>
      <Text>{t("home.occupants.p1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("home.occupants.p2")}</Text>
    </>
  );
};
