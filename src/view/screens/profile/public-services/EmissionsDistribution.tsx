import { VictoryPie } from "victory";

import { FootprintByCategory } from "@view/view-models/Footprint";
import { AppTheme } from "../../../../../AppTheme";

const pieWidth = 250;
const pieHeight = 100;

type Props = {
  publicServices: FootprintByCategory;
  merchantServices: FootprintByCategory;
};

export const PublicServicesEmissionsDistribution = ({
  publicServices,
  merchantServices,
}: Props) => {
  return (
    <svg viewBox={`0 110 ${pieWidth} ${pieHeight}`}>
      <VictoryPie
        colorScale={[publicServices.color, merchantServices.color]}
        standalone={false}
        width={pieWidth}
        startAngle={90}
        endAngle={-90}
        labelRadius={({ index }: any) => {
          if (index === 0) return 30;
          return 60;
        }}
        style={{ labels: { fontSize: 10, fill: AppTheme.colors.onBackground } }}
        data={[
          { x: publicServices.icon, y: publicServices.footprint },
          { x: merchantServices.icon, y: merchantServices.footprint },
        ]}
      />
    </svg>
  );
};
