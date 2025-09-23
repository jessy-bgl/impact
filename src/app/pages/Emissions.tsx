import { Emissions as EmissionsScreen } from "@carbonFootprint/view/screens/emissions/Emissions";
import { SafeAreaView } from "react-native-safe-area-context";

export const Emissions = () => (
  <SafeAreaView edges={["top", "left", "right"]}>
    <EmissionsScreen />
  </SafeAreaView>
);
