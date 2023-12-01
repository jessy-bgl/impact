import { ScrollView, View } from "react-native";

import { EmissionsDataTable } from "@view/screens/emissions/EmissionsDataTable";
import { EmissionsDistribution } from "@view/screens/emissions/EmissionsDistribution";
import { EmissionsEstimationButton } from "@view/screens/emissions/EmissionsEstimationButton";
import { EmissionsTitle } from "@view/screens/emissions/EmissionsTitle";
import { useFootprints } from "@view/view-models/useFootprints";

export const Emissions = () => {
  const { footprints, totalAnnualFootprint } = useFootprints();

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <EmissionsTitle />
      </View>

      <View style={{ width: 300 }}>
        <EmissionsDistribution
          footprints={footprints}
          totalFootprint={totalAnnualFootprint}
        />
      </View>

      {/* <View style={{ width: "90%" }}>
        <EmissionsGoal />
      </View> */}

      <View style={{ width: "90%" }}>
        <EmissionsDataTable footprints={footprints} />
      </View>

      <View style={{ width: "90%", marginTop: 20, marginBottom: 20 }}>
        <EmissionsEstimationButton />
      </View>
    </ScrollView>
  );
};
