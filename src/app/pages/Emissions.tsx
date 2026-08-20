import { EmissionsTabs } from "@carbonFootprint/view/screens/emissions/EmissionsTabs";
import { SafeAreaView } from "react-native-safe-area-context";

export const Emissions = () => (
  <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
    <EmissionsTabs />
  </SafeAreaView>
);
