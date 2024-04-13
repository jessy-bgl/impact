import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
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
  const { colors } = useTheme();
  const footprintByCategories = Object.values(footprints);

  // NB: as of april 2024, victory-native Pie.Chart does not support labels
  // TODO
  return (
    <View style={{ height: 300, paddingTop: 20, paddingBottom: 10 }}>
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
        <Pie.Chart innerRadius={80} />
      </PolarChart>
    </View>
  );
};
