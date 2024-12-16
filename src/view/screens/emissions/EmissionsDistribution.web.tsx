import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Svg } from "react-native-svg";
import { VictoryLabel, VictoryPie } from "victory";

import { Footprints } from "@view/view-models/Footprint";

const pieWidthAndHeight = 225;
const minFootprintToDisplayIcon = 100;

type Props = {
  footprints: Footprints;
  totalFootprint: number;
};

export const EmissionsDistributionForWeb = ({
  footprints,
  totalFootprint,
}: Props) => {
  const { t } = useTranslation("emissions");

  const { colors } = useTheme();

  const footprintByCategories = Object.values(footprints);

  return (
    <View style={{ width: pieWidthAndHeight }}>
      <Svg width={pieWidthAndHeight} height={pieWidthAndHeight}>
        <VictoryPie
          colorScale={footprintByCategories.map(({ color }) => color)}
          standalone={false}
          width={pieWidthAndHeight}
          height={pieWidthAndHeight}
          radius={pieWidthAndHeight / 2}
          innerRadius={pieWidthAndHeight / 3.3}
          labelRadius={pieWidthAndHeight / 2.8}
          style={{ labels: { fontSize: 17 } }}
          data={footprintByCategories.map(({ icon, footprint }) => ({
            x: icon,
            y: footprint,
          }))}
          labels={({ datum }) =>
            datum.y > minFootprintToDisplayIcon ? datum.x : ""
          }
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20, fill: colors.onBackground }}
          x={pieWidthAndHeight / 2}
          y={pieWidthAndHeight / 2}
          text={`${(totalFootprint / 1000).toFixed(2)}\ntCO2e/${t("year")}`}
        />
      </Svg>
    </View>
  );
};
