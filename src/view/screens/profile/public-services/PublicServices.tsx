import { useTranslation } from "react-i18next";
import { ScrollView, View, ViewStyle } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import {
  merchantServicesFootprint,
  publicServicesFootprint,
  societalServicesFootprint,
} from "@domain/entities/public-services/PublicServices";
import { PublicServicesEmissionsDistribution } from "@view/screens/profile/public-services/EmissionsDistribution";
import { FootprintByCategory } from "@view/view-models/Footprint";

export const PublicServicesProfile = () => {
  const { t } = useTranslation("publicServices");
  const appTheme = useTheme();

  const infoCardStyle: ViewStyle = {
    borderColor: appTheme.colors.secondary,
    borderRadius: 5,
  };

  const publicServices = FootprintByCategory.forPublicServices(
    publicServicesFootprint,
    societalServicesFootprint,
  );

  const merchantServices = FootprintByCategory.forMerchantServices(
    merchantServicesFootprint,
    societalServicesFootprint,
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card mode="outlined" style={infoCardStyle}>
        <View style={{ padding: 8, flexDirection: "row" }}>
          <View style={{ marginRight: 10, justifyContent: "center" }}>
            <Icon size={20} source="information-outline" />
          </View>
          <Text>{t("info")}</Text>
        </View>
      </Card>
      <Text style={{ marginTop: 10 }}>{t("description")}</Text>
      <PublicServicesEmissionsDistribution
        merchantServices={merchantServices}
        publicServices={publicServices}
      />
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
