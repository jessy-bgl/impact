import { useState } from "react";
import { LayoutRectangle, ScrollView, View } from "react-native";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { useFootprints } from "@carbonFootprint/domain/hooks/useFootprints";
import { FootprintDonut } from "@carbonFootprint/view/components/FootprintDonut";
import { EmissionsDataTable } from "@carbonFootprint/view/screens/emissions/EmissionsDataTable";
import { EmissionsEstimationPanel } from "@carbonFootprint/view/screens/emissions/EmissionsEstimationPanel";

const minRadius = 90;
const maxRadius = 120;
const chartMargin = 16;

const contentWidth = { width: "90%", maxWidth: 400 } as const;

export const EmissionsSummary = () => {
  const { isLoading, footprints, annualFootprint } = useFootprints();

  // The donut takes whatever height the table and the estimation panel leave,
  // so the whole summary fits the screen while it can stay readable.
  const [chartArea, setChartArea] = useState<LayoutRectangle>();
  const radius =
    chartArea &&
    Math.max(
      minRadius,
      Math.min(
        maxRadius,
        (Math.min(chartArea.width, chartArea.height) - chartMargin) / 2,
      ),
    );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 8,
          gap: 4,
        }}
      >
        <View
          onLayout={(event) => setChartArea(event.nativeEvent.layout)}
          style={{
            flex: 1,
            alignSelf: "stretch",
            minHeight: minRadius * 2 + chartMargin,
            maxHeight: maxRadius * 2 + chartMargin,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {radius !== undefined && (
            <FootprintDonut
              isLoading={isLoading}
              categories={categoryOrder.map((category) => footprints[category])}
              totalFootprint={annualFootprint}
              radius={radius}
            />
          )}
        </View>

        <View style={contentWidth}>
          <EmissionsDataTable footprints={footprints} isLoading={isLoading} />
        </View>
      </ScrollView>

      {/* Pinned out of the scroll: the call to action stays in reach on any
          screen. */}
      <EmissionsEstimationPanel />
    </View>
  );
};
