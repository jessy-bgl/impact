import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Divider, Icon, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSocietalServicesFootprints } from "@carbonFootprint/domain/hooks/useSocietalServicesFootprints";
import { FootprintDonut } from "@carbonFootprint/view/components/FootprintDonut";
import { SocietalServicesAccordion } from "@carbonFootprint/view/screens/profile/public-services/SocietalServicesAccordion";

const donutRadius = 100;

export const SocietalServicesProfile = () => {
  const { t } = useTranslation("societalServices");

  const { colors, roundness } = useTheme();

  const { isLoading, publicServices, merchantServices, totalFootprint } =
    useSocietalServicesFootprints();

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: 400, gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              padding: 12,
              borderRadius: roundness * 3,
              backgroundColor: colors.surfaceVariant,
            }}
          >
            <Icon
              source="information-outline"
              size={20}
              color={colors.onSurfaceVariant}
            />
            <Text
              variant="bodySmall"
              style={{ flex: 1, color: colors.onSurfaceVariant }}
            >
              {t("info")}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <FootprintDonut
              isLoading={isLoading}
              categories={[publicServices, merchantServices]}
              totalFootprint={totalFootprint}
              radius={donutRadius}
            />
          </View>

          <View>
            <SocietalServicesAccordion
              category={publicServices}
              name={t("publicServices.name")}
              examples={t("publicServices.examples")}
              description={t("publicServices.description")}
            />
            <Divider />
            <SocietalServicesAccordion
              category={merchantServices}
              name={t("merchantServices.name")}
              examples={t("merchantServices.examples")}
              description={t("merchantServices.description")}
            />
          </View>

          <View style={{ gap: 4 }}>
            <Text variant="titleSmall">{t("whyShared.title")}</Text>
            <Text
              variant="bodyMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              {t("whyShared.body")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
