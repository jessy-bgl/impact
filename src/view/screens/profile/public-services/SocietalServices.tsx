import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, ViewStyle } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import { UsecasesContext } from "@common/UsecasesContext";
import { SocietalServicesEmissionsDistribution } from "@view/screens/profile/public-services/EmissionsDistribution";
import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

export const SocietalServicesProfile = () => {
  const { fetchSocietalServicesFootprint } = useContext(UsecasesContext);

  const societalServicesFootprint = fetchSocietalServicesFootprint();

  const { t } = useTranslation("societalServices");

  const appTheme = useTheme();

  const infoCardStyle: ViewStyle = {
    borderColor: appTheme.colors.secondary,
    borderRadius: 5,
  };

  const publicServices = FootprintCategoryViewModel.forPublicServices(
    societalServicesFootprint.publicServicesFootprint,
    societalServicesFootprint.annualFootprint,
  );

  const merchantServices = FootprintCategoryViewModel.forMerchantServices(
    societalServicesFootprint.merchantServicesFootprint,
    societalServicesFootprint.annualFootprint,
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card mode="outlined" style={infoCardStyle}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: 10, justifyContent: "center" }}>
            <Icon size={20} source="information-outline" />
          </View>
          <Text style={{ flex: 1, padding: 10 }}>{t("info")}</Text>
        </View>
      </Card>

      <Text style={{ marginTop: 10 }}>{t("description")}</Text>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <SocietalServicesEmissionsDistribution
          merchantServices={merchantServices}
          publicServices={publicServices}
        />
      </View>

      <Text style={{ marginTop: 10 }}>
        {t("publicServicesDescription", {
          icon: publicServices.icon,
          footprint: publicServices.footprint,
        })}
      </Text>

      <Text style={{ marginTop: 10 }}>
        {t("merchantDescription", {
          icon: merchantServices.icon,
          footprint: merchantServices.footprint,
        })}
      </Text>
    </ScrollView>
  );
};
