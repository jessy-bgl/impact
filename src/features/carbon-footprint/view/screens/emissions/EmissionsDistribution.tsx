import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Text, useTheme } from "react-native-paper";

import { FootprintViewModels } from "@carbonFootprint/domain/entities/FootprintViewModel";
import { Skeleton } from "moti/skeleton";

const pieWidthAndHeight = 250;
const innerRadius = pieWidthAndHeight / 3.5;

type Props = {
  isLoading: boolean;
  footprints: FootprintViewModels;
  totalFootprint: number;
};

export const EmissionsDistribution = ({
  isLoading,
  footprints,
  totalFootprint,
}: Props) => {
  const { t } = useTranslation("emissions");

  const footprintByCategories = Object.values(footprints);

  const { colors, dark } = useTheme();

  return (
    <View
      style={{
        width: pieWidthAndHeight,
        height: pieWidthAndHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <>
          <Skeleton
            colorMode={dark ? "dark" : "light"}
            radius="round"
            width={pieWidthAndHeight}
            height={pieWidthAndHeight}
          />
          <View
            style={{
              position: "absolute",
              width: innerRadius * 2,
              height: innerRadius * 2,
              borderRadius: innerRadius,
              backgroundColor: colors.background,
            }}
          />
        </>
      ) : (
        <PieChart
          donut
          showText
          innerRadius={innerRadius}
          innerCircleColor={colors.background}
          data={footprintByCategories.map(({ icon, footprint, color }) => ({
            text: icon,
            value: footprint,
            color,
          }))}
          centerLabelComponent={() => (
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              {`${(totalFootprint / 1000).toFixed(2)}\ntCO2e/${t("year")}`}
            </Text>
          )}
        />
      )}
    </View>
  );
};
