import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Pie, PolarChart } from "victory-native";

import { Footprints } from "@view/view-models/Footprint";

const pieWidthAndHeight = 250;

type Props = {
  footprints: Footprints;
  totalFootprint: number;
};

export const EmissionsDistributionForMobile = ({
  footprints,
  totalFootprint,
}: Props) => {
  const { t } = useTranslation("emissions");
  const footprintByCategories = Object.values(footprints);

  // NB: as of april 2024, victory-native Pie.Chart does not support labels
  return (
    <View
      style={{
        width: pieWidthAndHeight,
        height: pieWidthAndHeight,
      }}
    >
      <PolarChart
        data={footprintByCategories.map(({ icon, footprint, color }) => ({
          label: icon,
          value: footprint,
          color,
        }))}
        labelKey={"label"}
        valueKey={"value"}
        colorKey={"color"}
      >
        <Pie.Chart innerRadius={pieWidthAndHeight / 3.1} />
      </PolarChart>
      <Text
        variant="titleLarge"
        style={{
          position: "absolute",
          top: "38%",
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        {`${(totalFootprint / 1000).toFixed(2)}\ntCO2e/${t("year")}`}
      </Text>
    </View>
  );
};
