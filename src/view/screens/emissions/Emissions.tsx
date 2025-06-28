import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmissionsDataTable } from "@view/screens/emissions/EmissionsDataTable";
import { EmissionsDistribution } from "@view/screens/emissions/EmissionsDistribution";
import { EmissionsEstimationButton } from "@view/screens/emissions/EmissionsEstimationButton";
import { EmissionsTitle } from "@view/screens/emissions/EmissionsTitle";
import { useFootprints } from "@view/view-models/useFootprints";

export const Emissions = () => {
  const { footprints, annualFootprint } = useFootprints();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 10 }}>
          <EmissionsTitle />
        </View>

        <View style={{ padding: 10 }}>
          <EmissionsDistribution
            footprints={footprints}
            totalFootprint={annualFootprint}
          />
        </View>

        <View style={{ width: "90%", maxWidth: 400 }}>
          <EmissionsDataTable footprints={footprints} />
        </View>

        <View
          style={{
            width: "90%",
            maxWidth: 400,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <EmissionsEstimationButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
