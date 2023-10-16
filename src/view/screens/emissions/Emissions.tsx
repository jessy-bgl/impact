import { useContext } from "react";
import { ScrollView, View } from "react-native";

import { EmissionsDataTable } from "./EmissionsDataTable";
import { EmissionsDistribution } from "./EmissionsDistribution";
import { EmissionsEstimationButton } from "./EmissionsEstimationButton";
import { EmissionsGoal } from "./EmissionsGoal";
import { EmissionsTitle } from "./EmissionsTitle";
import { UsecasesContext } from "../../../common/UsecasesContext";
import { Footprints } from "../../../domain/models/Footprint";

export const Emissions = () => {
  const { useFetchFootprints } = useContext(UsecasesContext);

  const footprints: Footprints = useFetchFootprints();

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <EmissionsTitle />
      </View>

      <View style={{ width: 300 }}>
        <EmissionsDistribution footprints={footprints} />
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
