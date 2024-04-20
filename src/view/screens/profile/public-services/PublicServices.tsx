import { useTranslation } from "react-i18next";
import { Platform, ScrollView, View, ViewStyle } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import {
  merchantServicesFootprint,
  publicServicesFootprint,
  societalServicesFootprint,
} from "@domain/entities/categories/public-services/PublicServices";
import { PublicServicesEmissionsDistributionForMobile } from "@view/screens/profile/public-services/EmissionsDistribution.mobile";
import { PublicServicesEmissionsDistributionForWeb } from "@view/screens/profile/public-services/EmissionsDistribution.web";
import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

export const PublicServicesProfile = () => {
  const { t } = useTranslation("publicServices");
  const appTheme = useTheme();

  const infoCardStyle: ViewStyle = {
    borderColor: appTheme.colors.secondary,
    borderRadius: 5,
  };

  const publicServices = FootprintCategoryViewModel.forPublicServices(
    publicServicesFootprint,
    societalServicesFootprint,
  );

  const merchantServices = FootprintCategoryViewModel.forMerchantServices(
    merchantServicesFootprint,
    societalServicesFootprint,
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
        <PublicServicesEmissionsDistributionForWeb
          merchantServices={merchantServices}
          publicServices={publicServices}
        />
      ) : (
        <PublicServicesEmissionsDistributionForMobile
          publicServices={publicServices}
          merchantServices={merchantServices}
        />
      )}

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
