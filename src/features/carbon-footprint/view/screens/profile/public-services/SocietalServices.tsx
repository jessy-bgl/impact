import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { CategoryBadge } from "@carbonFootprint/view/components/CategoryBadge";
import { SocietalServicesEmissionsDistribution } from "@carbonFootprint/view/screens/profile/public-services/EmissionsDistribution";
import { OutlinedCard } from "@common/components/OutlinedCard";
import { useAppStore } from "@common/store/useStore";
import { formatTonnes } from "@common/utils/formatTonnes";

export const SocietalServicesProfile = () => {
  const societalServicesFootprint = useAppStore(
    (state) => state.footprints.societalServices,
  );

  const { t } = useTranslation("societalServices");

  const palette = useCategoryPalette();

  const publicServices = FootprintCategoryViewModel.forPublicServices(
    societalServicesFootprint.publicServicesFootprint,
    societalServicesFootprint.annualFootprint,
  );

  const merchantServices = FootprintCategoryViewModel.forMerchantServices(
    societalServicesFootprint.merchantServicesFootprint,
    societalServicesFootprint.annualFootprint,
  );

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          maxWidth: 500,
          alignSelf: "center",
          padding: 10,
          paddingBottom: 10,
        }}
      >
        <OutlinedCard>
          <Card.Content>
            <Text variant="bodyMedium">{t("info")}</Text>
          </Card.Content>
        </OutlinedCard>

        <Text variant="bodyMedium">{t("description")}</Text>

        <View>
          <SocietalServicesEmissionsDistribution
            merchantServices={merchantServices}
            publicServices={publicServices}
          />
        </View>

        <OutlinedCard>
          <Card.Content style={{ flexDirection: "row", gap: 12 }}>
            <CategoryBadge
              color={palette[publicServices.styleKey]}
              icon={publicServices.icon}
            />
            <Text variant="bodyMedium" style={{ flex: 1 }}>
              {t("publicServicesDescription", {
                footprint: formatTonnes(publicServices.footprint),
              })}
            </Text>
          </Card.Content>
        </OutlinedCard>

        <OutlinedCard>
          <Card.Content style={{ flexDirection: "row", gap: 12 }}>
            <CategoryBadge
              color={palette[merchantServices.styleKey]}
              icon={merchantServices.icon}
            />
            <Text variant="bodyMedium" style={{ flex: 1 }}>
              {t("merchantDescription", {
                footprint: formatTonnes(merchantServices.footprint),
              })}
            </Text>
          </Card.Content>
        </OutlinedCard>
      </ScrollView>
    </SafeAreaView>
  );
};
