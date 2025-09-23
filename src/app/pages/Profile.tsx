import { SafeAreaView } from "react-native-safe-area-context";

import { Profile as ProfileScreen } from "@carbonFootprint/view/screens/profile/Profile";

export const Profile = () => (
  <SafeAreaView edges={["bottom", "left", "right"]}>
    <ProfileScreen />
  </SafeAreaView>
);
