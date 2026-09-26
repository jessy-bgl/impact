import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import { isCategoryCompleted } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { posthog } from "@common/config/posthog";
import { useProfile } from "@carbonFootprint/domain/hooks/useProfile";
import { useProfileSync } from "@carbonFootprint/domain/hooks/useProfileSync";
import { ProfileCategoryCard } from "@carbonFootprint/view/screens/profile/ProfileCategoryCard";
import { ProfileTourHelpButton } from "@carbonFootprint/view/tour/ProfileTourHelpButton";
import { useTourScrollContainer } from "@common/tour/useTourScrollContainer";

export const Profile = () => {
  const { t } = useTranslation("pages");

  const { navigate, setOptions } = useNavigation<EmissionsNavigatorProp>();

  const {
    profileCompletion,
    transportFootprint,
    housingFootprint,
    foodFootprint,
    everydayThingsFootprint,
    societalServicesFootprint,
  } = useProfile();

  useProfileSync();

  useLayoutEffect(
    () => setOptions({ headerRight: () => <ProfileTourHelpButton /> }),
    [setOptions],
  );

  // The tour may start after the user scrolled down: let it bring the
  // spotlighted card back into view.
  const scrollViewRef = useRef<ScrollView>(null);
  useTourScrollContainer(scrollViewRef);

  return (
    <ScrollView
      ref={scrollViewRef}
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
