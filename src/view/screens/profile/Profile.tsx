import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, ScrollView } from "react-native";

import { ProfileCategoryCard } from "./ProfileCategoryCard";
import { useProfile } from "./useProfile";
import { AppNavigationProp } from "@common/AppNavigation";

export const Profile = () => {
  const { t } = useTranslation("common");

  const { navigate } = useNavigation<AppNavigationProp>();

  const {
    transportFootprint,
    housingFootprint,
    foodFootprint,
    goodsFootprint,
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
          title={t("goods")}
          icon={goodsFootprint.materialIcon}
          footprintCategory={goodsFootprint}
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
