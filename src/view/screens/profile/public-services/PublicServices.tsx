import { ScrollView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text, Card, Icon } from "react-native-paper";

import { FootprintByCategory } from "@view/view-models/Footprint";
import { PublicServicesEmissionsDistribution } from "@view/screens/profile/public-services/EmissionsDistribution";
import {
  societalServicesFootprint,
  publicServicesFootprint,
  merchantServicesFootprint,
} from "@domain/entities/public-services/PublicServices";

import { AppTheme } from "../../../../../AppTheme";

export const PublicServicesProfile = () => {
  const { t } = useTranslation("publicServices");

  const publicServices = FootprintByCategory.forPublicServices(
    publicServicesFootprint,
    societalServicesFootprint,
  );

  const merchantServices = FootprintByCategory.forMerchantServices(
    merchantServicesFootprint,
    societalServicesFootprint,
  );

  return (
    <ScrollView style={styles.container}>
      <Card mode="outlined" style={styles.infoCard}>
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

const styles = StyleSheet.create({
  container: { padding: 10 },
  infoCard: {
    borderColor: AppTheme.colors.secondary,
    borderRadius: 5,
  },
});
