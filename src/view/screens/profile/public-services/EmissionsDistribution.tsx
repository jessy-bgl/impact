import { Platform, useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { FootprintCategoryViewModel } from "@view/view-models/Footprint";

type Props = {
  publicServices: FootprintCategoryViewModel;
  merchantServices: FootprintCategoryViewModel;
};

export const SocietalServicesEmissionsDistribution = ({
  publicServices,
  merchantServices,
}: Props) => {
  const { width } = useWindowDimensions();

  const pieSize =
    Platform.OS === "web" ? Math.min(250, width * 0.6) : width * 0.9;

  return (
    <View style={{ alignItems: "center" }}>
      <PieChart
        showText
        semiCircle={Platform.OS !== "web"}
        radius={pieSize / 2}
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
