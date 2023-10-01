import { VictoryLabel, VictoryPie } from "victory-native";

const pieWidth = 250;
const pieHeight = 250;

export const EmissionsDistribution = () => {
  return (
    <svg viewBox={`0 0 ${pieWidth} ${pieHeight}`}>
      <VictoryPie
        colorScale={["tomato", "sandybrown", "khaki", "CornflowerBlue", "plum"]}
        standalone={false}
        width={pieWidth}
        height={pieHeight}
        data={[
          { x: "🏠", y: 20 },
          { x: "🚗", y: 20 },
          { x: "🛍️", y: 20 },
          { x: "💻", y: 20 },
          { x: "🍲", y: 20 },
        ]}
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
        text={"9.35\ntCO2/an"}
      />
    </svg>
  );
};
