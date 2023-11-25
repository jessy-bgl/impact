import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { VictoryLabel, VictoryPie } from "victory";

import { Footprints } from "@view/view-models/Footprint";

const pieWidth = 250;
const pieHeight = 250;

type Props = {
  footprints: Footprints;
  totalFootprint: number;
};

export const EmissionsDistribution = ({
  footprints,
  totalFootprint,
}: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();
  const footprintByCategories = Object.values(footprints);

  return (
    <svg viewBox={`0 0 ${pieWidth} ${pieHeight}`}>
      <VictoryPie
        colorScale={footprintByCategories.map(({ color }) => color)}
        standalone={false}
        width={pieWidth}
        height={pieHeight}
        radius={110}
        innerRadius={60}
        labelRadius={75}
        style={{ labels: { fontSize: 17 } }}
        data={footprintByCategories.map(({ icon, footprint }) => ({
          x: icon,
          y: footprint,
        }))}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20, fill: colors.onBackground }}
        x={pieWidth / 2}
        y={pieHeight / 2}
        text={`${(totalFootprint / 1000).toFixed(2)}\ntCO2e/${t("year")}`}
      />
    </svg>
  );
};
