import { useTranslation } from "react-i18next";
import { Platform, ScrollView, View, ViewStyle } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import { UsecasesContext } from "@common/UsecasesContext";
import { SocietalServicesEmissionsDistributionForMobile } from "@view/screens/profile/public-services/EmissionsDistribution.mobile";
import { SocietalServicesEmissionsDistributionForWeb } from "@view/screens/profile/public-services/EmissionsDistribution.web";
import { FootprintCategoryViewModel } from "@view/view-models/Footprint";
import { useContext } from "react";

export const SocietalServicesProfile = () => {
  const { fetchSocietalServicesFootprint } = useContext(UsecasesContext);

  const societalServicesFootprint = fetchSocietalServicesFootprint();

  const { t } = useTranslation("societalServices");

  const appTheme = useTheme();

  const infoCardStyle: ViewStyle = {
    borderColor: appTheme.colors.secondary,
    borderRadius: 5,
  };

  const societalServices = FootprintCategoryViewModel.forSocietalServices(
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

      {Platform.OS === "web" ? (
        <SocietalServicesEmissionsDistributionForWeb
          merchantServices={merchantServices}
          publicServices={societalServices}
        />
      ) : (
        <SocietalServicesEmissionsDistributionForMobile
          publicServices={societalServices}
          merchantServices={merchantServices}
        />
      )}

      <Text style={{ marginTop: 10 }}>
        {t("societalServicesDescription", {
          icon: societalServices.icon,
          footprint: societalServices.footprint,
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
