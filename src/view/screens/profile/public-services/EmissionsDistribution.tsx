import { PieChart } from "react-native-gifted-charts";

import { FootprintCategoryViewModel } from "@view/view-models/Footprint";
import { Platform, View } from "react-native";

const pieSize = 100;

type Props = {
  publicServices: FootprintCategoryViewModel;
  merchantServices: FootprintCategoryViewModel;
};

export const SocietalServicesEmissionsDistribution = ({
  publicServices,
  merchantServices,
}: Props) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: Platform.OS === "web" ? -pieSize : 0,
      }}
    >
      <PieChart
        showText
        semiCircle
        radius={pieSize * 2}
        textSize={20}
        data={[
          {
            text: publicServices.icon,
            value: publicServices.footprint,
            color: publicServices.color,
          },
          {
            text: merchantServices.icon,
            value: merchantServices.footprint,
            color: merchantServices.color,
          },
        ]}
      />
    </View>
  );
};
