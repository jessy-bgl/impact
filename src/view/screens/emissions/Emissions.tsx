import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmissionsDataTable } from "@view/screens/emissions/EmissionsDataTable";
import { EmissionsDistributionForMobile } from "@view/screens/emissions/EmissionsDistribution.mobile";
import { EmissionsDistributionForWeb } from "@view/screens/emissions/EmissionsDistribution.web";
import { EmissionsEstimationButton } from "@view/screens/emissions/EmissionsEstimationButton";
import { EmissionsTitle } from "@view/screens/emissions/EmissionsTitle";
import { useFootprints } from "@view/view-models/useFootprints";

export const Emissions = () => {
  const { footprints, totalAnnualFootprint } = useFootprints();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <EmissionsTitle />
        </View>

        <View>
          {Platform.OS === "web" ? (
            <EmissionsDistributionForWeb
              footprints={footprints}
              totalFootprint={totalAnnualFootprint}
            />
          ) : (
            <EmissionsDistributionForMobile
              footprints={footprints}
              totalFootprint={totalAnnualFootprint}
            />
          )}
        </View>

        <View style={{ width: "90%" }}>
          <EmissionsDataTable footprints={footprints} />
        </View>

        <View style={{ width: "90%", marginTop: 20, marginBottom: 20 }}>
          <EmissionsEstimationButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
