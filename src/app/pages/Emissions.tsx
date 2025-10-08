import { Emissions as EmissionsScreen } from "@carbonFootprint/view/screens/emissions/Emissions";
import { SafeAreaView } from "react-native-safe-area-context";

export const Emissions = () => (
  <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
    <EmissionsScreen />
  </SafeAreaView>
);
