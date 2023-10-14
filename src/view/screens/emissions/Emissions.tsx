import { useContext } from "react";
import { ScrollView, View } from "react-native";

import { EmissionsDataTable } from "./EmissionsDataTable";
import { EmissionsDistribution } from "./EmissionsDistribution";
import { EmissionsEstimationButton } from "./EmissionsEstimationButton";
import { EmissionsGoal } from "./EmissionsGoal";
import { EmissionsTitle } from "./EmissionsTitle";
import { UsecasesContext } from "../../../common/UsecasesContext";
import { FootprintByCategory } from "../../../domain/models/transport/car/FootprintCategories";

export const Emissions = () => {
  const { useFetchFootprintByCategory } = useContext(UsecasesContext);

  const data: FootprintByCategory[] = useFetchFootprintByCategory();

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <EmissionsTitle />
      </View>

      <View style={{ width: 300 }}>
        <EmissionsDistribution footprintByCategory={data} />
      </View>

      <View style={{ width: "90%" }}>
        <EmissionsGoal />
      </View>

      <View style={{ width: "90%" }}>
        <EmissionsDataTable footprintByCategory={data} />
      </View>

      <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
        <EmissionsEstimationButton />
      </View>
    </ScrollView>
  );
};
