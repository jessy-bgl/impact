import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Animated, ScrollView } from "react-native";
import { Icon, useTheme } from "react-native-paper";

import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import { isCategoryCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { posthog } from "@common/config/posthog";
import { useProfile } from "@carbonFootprint/domain/hooks/useProfile";
import { useProfileSync } from "@carbonFootprint/domain/hooks/useProfileSync";
import { ProfileCategoryCard } from "@carbonFootprint/view/screens/profile/ProfileCategoryCard";

export const Profile = () => {
  const { t } = useTranslation("pages");

  const { navigate } = useNavigation<EmissionsNavigatorProp>();

  const { colors } = useTheme();

  const {
    profileCompletion,
    transportFootprint,
    housingFootprint,
    foodFootprint,
    everydayThingsFootprint,
    societalServicesFootprint,
  } = useProfile();

  const renderSyncIcon = (animatedValue: Animated.Value) => (
    <Animated.View
      style={{
        marginRight: 15,
        transform: [
          {
            rotate: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"],
            }),
          },
        ],
      }}
    >
      <Icon source="sync" size={24} color={colors.onSurfaceDisabled} />
    </Animated.View>
  );

  useProfileSync({ renderSyncIcon });

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        paddingBottom: 10,
        gap: 10,
      }}
    >
      <ProfileCategoryCard
        title={t("Transport")}
        footprintCategory={transportFootprint}
        onClick={() => {
          posthog.capture("profile_category_opened", { category: "transport" });
          navigate("TransportProfile");
        }}
        isCompleted={isCategoryCompleted(profileCompletion, "transport")}
      />
      <ProfileCategoryCard
        title={t("Housing")}
        footprintCategory={housingFootprint}
        onClick={() => {
          posthog.capture("profile_category_opened", { category: "housing" });
          navigate("HousingProfile");
        }}
        isCompleted={isCategoryCompleted(profileCompletion, "housing")}
      />
      <ProfileCategoryCard
        title={t("Food")}
        footprintCategory={foodFootprint}
        onClick={() => {
          posthog.capture("profile_category_opened", { category: "food" });
          navigate("FoodProfile");
        }}
        isCompleted={isCategoryCompleted(profileCompletion, "food")}
      />
      <ProfileCategoryCard
        title={t("EverydayThings")}
        footprintCategory={everydayThingsFootprint}
        onClick={() => {
          posthog.capture("profile_category_opened", {
            category: "everydayThings",
          });
          navigate("EverydayThingsProfile");
        }}
        isCompleted={isCategoryCompleted(profileCompletion, "everydayThings")}
      />
      <ProfileCategoryCard
        title={t("SocietalServices")}
        footprintCategory={societalServicesFootprint}
        onClick={() => {
          posthog.capture("profile_category_opened", {
            category: "societalServices",
          });
          navigate("SocietalServicesProfile");
        }}
        isCompleted={isCategoryCompleted(profileCompletion, "societalServices")}
      />
    </ScrollView>
  );
};
