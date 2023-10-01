import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { EmissionsDistribution } from "./EmissionsDistribution";

export const Emissions = () => {
  const { t } = useTranslation("emissions");

  return (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Text
        variant="titleLarge"
        style={{ paddingTop: 10, textAlign: "center" }}
      >
        {t("impactDistributionTitle")}
      </Text>

      <View style={{ width: 300 }}>
        <EmissionsDistribution />
      </View>
    </View>
  );
};
