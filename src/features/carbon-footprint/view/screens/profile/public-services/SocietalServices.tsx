import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/FootprintViewModel";
import { SocietalServicesEmissionsDistribution } from "@carbonFootprint/view/screens/profile/public-services/EmissionsDistribution";
import { useAppStore } from "@common/store/useStore";

export const SocietalServicesProfile = () => {
  const societalServicesFootprint = useAppStore(
    (state) => state.footprints.societalServices,
  );

  const { t } = useTranslation("societalServices");

  const publicServices = FootprintCategoryViewModel.forPublicServices(
    societalServicesFootprint.publicServicesFootprint,
    societalServicesFootprint.annualFootprint,
  );

  const merchantServices = FootprintCategoryViewModel.forMerchantServices(
    societalServicesFootprint.merchantServicesFootprint,
    societalServicesFootprint.annualFootprint,
  );

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          maxWidth: 500,
          alignSelf: "center",
          padding: 10,
          paddingBottom: 10,
        }}
      >
        <Card mode="outlined">
          <Card.Content>
            <Text variant="bodyMedium">{t("info")}</Text>
          </Card.Content>
        </Card>

        <Text variant="bodyMedium">{t("description")}</Text>

        <View>
          <SocietalServicesEmissionsDistribution
            merchantServices={merchantServices}
            publicServices={publicServices}
          />
        </View>

        <Card>
          <Card.Content>
            <Text variant="bodyMedium">
              {t("publicServicesDescription", {
                icon: publicServices.icon,
                footprint: publicServices.footprint,
              })}
            </Text>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Text variant="bodyMedium">
              {t("merchantDescription", {
                icon: merchantServices.icon,
                footprint: merchantServices.footprint,
              })}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
