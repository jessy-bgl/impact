import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const Tracking = () => {
  const { t } = useTranslation(["common"]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>{t("comingSoon")}</Text>
    </View>
  );
};
