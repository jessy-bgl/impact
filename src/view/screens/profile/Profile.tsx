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
        />
        <ProfileCategoryCard
          title={t("Housing")}
          footprintCategory={housingFootprint}
          onClick={() => navigate("HousingProfile")}
        />
        <ProfileCategoryCard
          title={t("Food")}
          footprintCategory={foodFootprint}
          onClick={() => navigate("FoodProfile")}
        />
        <ProfileCategoryCard
          title={t("EverydayThings")}
          footprintCategory={everydayThingsFootprint}
          onClick={() => navigate("EverydayThingsProfile")}
        />
        <ProfileCategoryCard
          title={t("SocietalServices")}
          footprintCategory={societalServicesFootprint}
          onClick={() => navigate("SocietalServicesProfile")}
        />
      </View>
    </ScrollView>
  );
};
