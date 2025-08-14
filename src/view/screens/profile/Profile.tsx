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
          completed={Object.values(profileCompletion.transport).every(Boolean)}
        />
        <ProfileCategoryCard
          title={t("Housing")}
          footprintCategory={housingFootprint}
          onClick={() => navigate("HousingProfile")}
          completed={Object.values(profileCompletion.housing).every(Boolean)}
        />
        <ProfileCategoryCard
          title={t("Food")}
          footprintCategory={foodFootprint}
          onClick={() => navigate("FoodProfile")}
          completed={Object.values(profileCompletion.food).every(Boolean)}
        />
        <ProfileCategoryCard
          title={t("EverydayThings")}
          footprintCategory={everydayThingsFootprint}
          onClick={() => navigate("EverydayThingsProfile")}
          completed={Object.values(profileCompletion.everydayThings).every(
            Boolean,
          )}
        />
        <ProfileCategoryCard
          title={t("SocietalServices")}
          footprintCategory={societalServicesFootprint}
          onClick={() => navigate("SocietalServicesProfile")}
          completed={Object.values(profileCompletion.societalServices).every(
            Boolean,
          )}
        />
      </View>
    </ScrollView>
  );
};
