import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

import { ProfileCategoryCard } from "./ProfileCategoryCard";
import { useProfile } from "./useProfile";
import transportImage from "../../../../assets/images/transport.svg";
import { AppNavigationProp } from "../../../common/AppNavigation";

export const Profile = () => {
  const { transportFootprint } = useProfile();
  const { navigate } = useNavigation<AppNavigationProp>();

  return (
    <View style={styles.container}>
      <ProfileCategoryCard
        icon="car"
        footprint={transportFootprint}
        imageSource={transportImage}
        onClick={() => navigate("TransportProfile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
