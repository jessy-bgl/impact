import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Text, useTheme } from "react-native-paper";

import { Footprints } from "@carbonFootprint/domain/entities/FootprintViewModel";

const pieWidthAndHeight = 250;

type Props = {
  footprints: Footprints;
  totalFootprint: number;
};

export const EmissionsDistribution = ({
  footprints,
  totalFootprint,
}: Props) => {
  const { t } = useTranslation("emissions");

  const footprintByCategories = Object.values(footprints);

  const { colors } = useTheme();

  return (
    <View
      style={{
        width: pieWidthAndHeight,
        height: pieWidthAndHeight,
        alignItems: "center",
      }}
    >
      <PieChart
        donut
        showText
        innerRadius={pieWidthAndHeight / 3.5}
        innerCircleColor={colors.background}
        data={footprintByCategories.map(({ icon, footprint, color }) => {
          return {
            text: icon,
            value: footprint,
            color,
          };
        })}
        centerLabelComponent={() => (
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            {`${(totalFootprint / 1000).toFixed(2)}\ntCO2e/${t("year")}`}
          </Text>
        )}
      />
    </View>
  );
};
