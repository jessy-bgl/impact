import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { EmissionsDataTable } from "@carbonFootprint/view/screens/emissions/EmissionsDataTable";
import { EmissionsDistribution } from "@carbonFootprint/view/screens/emissions/EmissionsDistribution";
import { EmissionsEstimationButton } from "@carbonFootprint/view/screens/emissions/EmissionsEstimationButton";
import { EmissionsTitle } from "@carbonFootprint/view/screens/emissions/EmissionsTitle";

export const Emissions = () => {
  const { isLoading, footprints, annualFootprint } = useFootprints();

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
            isLoading={isLoading}
            footprints={footprints}
            totalFootprint={annualFootprint}
          />
        </View>

        <View style={{ width: "90%", maxWidth: 400 }}>
          <EmissionsDataTable footprints={footprints} isLoading={isLoading} />
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
