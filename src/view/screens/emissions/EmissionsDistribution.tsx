import { useTranslation } from "react-i18next";
import { VictoryLabel, VictoryPie } from "victory-native";

import { EmissionCategory } from "../../../domain/models/emissionCategories";

const pieWidth = 250;
const pieHeight = 250;

type Props = {
  emissionCategories: EmissionCategory[];
};

export const EmissionsDistribution = ({ emissionCategories }: Props) => {
  const { t } = useTranslation("emissions");

  const totalCO2 = emissionCategories.reduce((acc, obj) => acc + obj.value, 0);

  return (
    <svg viewBox={`0 0 ${pieWidth} ${pieHeight}`}>
      <VictoryPie
        colorScale={emissionCategories.map(({ color }) => color)}
        standalone={false}
        width={pieWidth}
        height={pieHeight}
        data={emissionCategories.map(({ icon, value }) => ({
          x: icon,
          y: value,
        }))}
        radius={110}
        innerRadius={60}
        labelRadius={75}
        style={{ labels: { fontSize: 17, fill: "white" } }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20, fill: "white" }}
        x={pieWidth / 2}
        y={pieHeight / 2}
        text={`${(totalCO2 / 1000).toFixed(2)}\ntCO2/${t("year")}`}
      />
    </svg>
  );
};
