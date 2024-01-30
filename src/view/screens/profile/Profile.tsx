import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

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
    publicServicesFootprint,
  } = useProfile();

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileCategoryCard
          title={t("Transport")}
          icon={transportFootprint.materialIcon}
          footprintCategory={transportFootprint}
          onClick={() => navigate("TransportProfile")}
        />
        <ProfileCategoryCard
          title={t("Housing")}
          icon={housingFootprint.materialIcon}
          footprintCategory={housingFootprint}
          onClick={() => navigate("HousingProfile")}
        />
        <ProfileCategoryCard
          title={t("Food")}
          icon={foodFootprint.materialIcon}
          footprintCategory={foodFootprint}
          onClick={() => navigate("FoodProfile")}
        />
        <ProfileCategoryCard
          title={t("EverydayThings")}
          icon={everydayThingsFootprint.materialIcon}
          footprintCategory={everydayThingsFootprint}
          onClick={() => navigate("EverydayThingsProfile")}
        />
        <ProfileCategoryCard
          title={t("PublicServices")}
          icon={publicServicesFootprint.materialIcon}
          footprintCategory={publicServicesFootprint}
          onClick={() => navigate("PublicServicesProfile")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
});
