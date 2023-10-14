import { View, StyleSheet } from "react-native";

import { ProfileCategoryCard } from "./ProfileCategoryCard";
import { useProfile } from "./useProfile";
import transportImage from "../../../../assets/images/transport.svg";

export const Profile = () => {
  const { transportEmissions } = useProfile();

  return (
    <View style={styles.container}>
      <ProfileCategoryCard
        icon="car"
        emissions={transportEmissions}
        imageSource={transportImage}
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
