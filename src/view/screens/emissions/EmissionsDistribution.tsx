import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { VictoryLabel, VictoryPie } from "victory-native";

import { FootprintByCategory } from "../../../domain/models/transport/car/FootprintCategories";

const pieWidth = 250;
const pieHeight = 250;

type Props = {
  footprintByCategory: FootprintByCategory[];
};

export const EmissionsDistribution = ({ footprintByCategory }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  const totalCO2 = footprintByCategory.reduce((acc, obj) => acc + obj.value, 0);

  return (
    <svg viewBox={`0 0 ${pieWidth} ${pieHeight}`}>
      <VictoryPie
        colorScale={footprintByCategory.map(({ color }) => color)}
        standalone={false}
        width={pieWidth}
        height={pieHeight}
        radius={110}
        innerRadius={60}
        labelRadius={75}
        style={{ labels: { fontSize: 17 } }}
        data={footprintByCategory.map(({ icon, value }) => ({
          x: icon,
          y: value,
        }))}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20, fill: colors.onBackground }}
        x={pieWidth / 2}
        y={pieHeight / 2}
        text={`${(totalCO2 / 1000).toFixed(2)}\ntCO2/${t("year")}`}
      />
    </svg>
  );
};
