import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, ScrollView } from "react-native";

import { AppNavigationProp } from "@common/AppNavigation";
import { ProfileCategoryCard } from "@view/screens/profile/ProfileCategoryCard";
import { useProfile } from "./useProfile";

export const Profile = () => {
  const { t } = useTranslation("common");

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
          title={t("transport")}
          icon={transportFootprint.materialIcon}
          footprintCategory={transportFootprint}
          onClick={() => navigate("TransportProfile")}
        />
        <ProfileCategoryCard
          title={t("housing")}
          icon={housingFootprint.materialIcon}
          footprintCategory={housingFootprint}
          onClick={() => navigate("Profile")}
        />
        <ProfileCategoryCard
          title={t("food")}
          icon={foodFootprint.materialIcon}
          footprintCategory={foodFootprint}
          onClick={() => navigate("FoodProfile")}
        />
        <ProfileCategoryCard
          title={t("everydayThings")}
          icon={everydayThingsFootprint.materialIcon}
          footprintCategory={everydayThingsFootprint}
          onClick={() => navigate("Profile")}
        />
        <ProfileCategoryCard
          title={t("publicServices")}
          icon={publicServicesFootprint.materialIcon}
          footprintCategory={publicServicesFootprint}
          onClick={() => navigate("Profile")}
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
