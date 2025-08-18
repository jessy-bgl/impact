import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import { AppNavigationProp } from "@common/AppNavigation";
import { ProfileCategoryCard } from "@view/screens/profile/ProfileCategoryCard";
import { useProfile } from "./useProfile";

export const Profile = () => {
  const { t } = useTranslation("pages");

  const { navigate } = useNavigation<AppNavigationProp>();

  const {
    profileCompletion,
    transportFootprint,
    housingFootprint,
    foodFootprint,
    everydayThingsFootprint,
    societalServicesFootprint,
  } = useProfile();

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
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
      </View>
    </ScrollView>
  );
};
