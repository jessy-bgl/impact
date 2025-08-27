import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Animated, ScrollView } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppNavigationProp } from "@app/AppNavigation";
import { useProfile } from "@carbonFootprint/domain/hooks/useProfile";
import { useProfileSync } from "@carbonFootprint/domain/hooks/useProfileSync";
import { ProfileCategoryCard } from "@carbonFootprint/view/screens/profile/ProfileCategoryCard";

export const Profile = () => {
  const { t } = useTranslation("pages");

  const { navigate } = useNavigation<AppNavigationProp>();

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

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        paddingBottom: insets.bottom || 10,
        gap: 10,
      }}
    >
      <ProfileCategoryCard
        title={t("Transport")}
        footprintCategory={transportFootprint}
        onClick={() => navigate("TransportProfile")}
        completion={profileCompletion.transport}
      />
      <ProfileCategoryCard
        title={t("Housing")}
        footprintCategory={housingFootprint}
        onClick={() => navigate("HousingProfile")}
        completion={profileCompletion.housing}
      />
      <ProfileCategoryCard
        title={t("Food")}
        footprintCategory={foodFootprint}
        onClick={() => navigate("FoodProfile")}
        completion={profileCompletion.food}
      />
      <ProfileCategoryCard
        title={t("EverydayThings")}
        footprintCategory={everydayThingsFootprint}
        onClick={() => navigate("EverydayThingsProfile")}
        completion={profileCompletion.everydayThings}
      />
      <ProfileCategoryCard
        title={t("SocietalServices")}
        footprintCategory={societalServicesFootprint}
        onClick={() => navigate("SocietalServicesProfile")}
        completion={profileCompletion.societalServices}
      />
    </ScrollView>
  );
};
