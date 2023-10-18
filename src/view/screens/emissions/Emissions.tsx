import { ScrollView, View } from "react-native";

import { EmissionsDataTable } from "./EmissionsDataTable";
import { EmissionsDistribution } from "./EmissionsDistribution";
import { EmissionsEstimationButton } from "./EmissionsEstimationButton";
import { EmissionsGoal } from "./EmissionsGoal";
import { EmissionsTitle } from "./EmissionsTitle";
import { useFootprints } from "../../view-models/useFootprints";

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

      <View style={{ width: "90%" }}>
        <EmissionsGoal />
      </View>

      <View style={{ width: "90%" }}>
        <EmissionsDataTable footprints={footprints} />
      </View>

      <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
        <EmissionsEstimationButton />
      </View>
    </ScrollView>
  );
};
