import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, ScrollView } from "react-native";

import { ProfileCategoryCard } from "./ProfileCategoryCard";
import { useProfile } from "./useProfile";
import foodImage from "../../../../assets/images/food.svg";
import goodsImage from "../../../../assets/images/goods.svg";
import housingImage from "../../../../assets/images/house.svg";
import transportImage from "../../../../assets/images/transport.svg";
import { AppNavigationProp } from "../../../common/AppNavigation";

export const Profile = () => {
  const { t } = useTranslation("common");
  const {
    transportFootprint,
    housingFootprint,
    foodFootprint,
    goodsFootprint,
    // publicServicesFootprint,
  } = useProfile();
  const { navigate } = useNavigation<AppNavigationProp>();

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileCategoryCard
          title={t("transport")}
          icon="car"
          footprint={transportFootprint}
          imageSource={transportImage}
          onClick={() => navigate("TransportProfile")}
        />
        <ProfileCategoryCard
          title={t("housing")}
          icon="home"
          footprint={housingFootprint}
          imageSource={housingImage}
          onClick={() => navigate("Profile")}
        />
        <ProfileCategoryCard
          title={t("food")}
          icon="food"
          footprint={foodFootprint}
          imageSource={foodImage}
          onClick={() => navigate("Profile")}
        />
        <ProfileCategoryCard
          title={t("goods")}
          icon="package"
          footprint={goodsFootprint}
          imageSource={goodsImage}
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
