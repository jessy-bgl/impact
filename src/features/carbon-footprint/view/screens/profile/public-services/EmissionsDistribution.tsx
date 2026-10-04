import { Platform, useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";

type Props = {
  publicServices: FootprintCategoryViewModel;
  merchantServices: FootprintCategoryViewModel;
};

export const SocietalServicesEmissionsDistribution = ({
  publicServices,
  merchantServices,
}: Props) => {
  const { width } = useWindowDimensions();

  const palette = useCategoryPalette();

  const pieSize =
    Platform.OS === "web" ? Math.min(250, width * 0.6) : width * 0.9;

  return (
    <View style={{ alignItems: "center" }}>
      <PieChart
        semiCircle={Platform.OS !== "web"}
        radius={pieSize / 2}
        data={[
          {
            value: publicServices.footprint,
            color: palette[publicServices.styleKey],
          },
          {
            value: merchantServices.footprint,
            color: palette[merchantServices.styleKey],
          },
        ]}
      />
    </View>
  );
};
