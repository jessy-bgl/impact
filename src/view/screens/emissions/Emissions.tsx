import { ScrollView, View } from "react-native";

import { EmissionsDataTable } from "./EmissionsDataTable";
import { EmissionsDistribution } from "./EmissionsDistribution";
import { EmissionsEstimationButton } from "./EmissionsEstimationButton";
import { EmissionsGoal } from "./EmissionsGoal";
import { EmissionsTitle } from "./EmissionsTitle";
import {
  EmissionCategories,
  EmissionCategory,
} from "../../../domain/models/emissionCategories";

const emissionCategories = [
  new EmissionCategory(EmissionCategories.TRANSPORT, 2000, 20),
  new EmissionCategory(EmissionCategories.FOOD, 2000, 20),
  new EmissionCategory(EmissionCategories.HOUSING, 2000, 20),
  new EmissionCategory(EmissionCategories.GOODS, 2000, 20),
  new EmissionCategory(EmissionCategories.NUMERIC, 2000, 20),
];

export const Emissions = () => {
  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <EmissionsTitle />
      </View>

      <View style={{ width: 300 }}>
        <EmissionsDistribution emissionCategories={emissionCategories} />
      </View>

      <View style={{ width: "90%" }}>
        <EmissionsGoal />
      </View>

      <View style={{ width: "90%" }}>
        <EmissionsDataTable emissionCategories={emissionCategories} />
      </View>

      <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
        <EmissionsEstimationButton />
      </View>
    </ScrollView>
  );
};
