import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Icon, Text, useTheme } from "react-native-paper";

import { categoryOrder } from "@carbonFootprint/domain/entities/footprints/categoryOrder";
import { FootprintViewModels } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { computeDonutSliceCenters } from "@carbonFootprint/view/screens/emissions/donutSliceCenters";
import { formatTonnes } from "@common/utils/formatTonnes";
import { readableTextOn } from "@common/utils/readableTextOn";
import { Skeleton } from "moti/skeleton";

const pieWidthAndHeight = 250;
const radius = pieWidthAndHeight / 2;
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

  const { colors, dark } = useTheme();

  const palette = useCategoryPalette();

  const footprintByCategories = categoryOrder.map(
    (category) => footprints[category],
  );

  const iconSize = Math.max(14, Math.round((radius - innerRadius) * 0.4));

  // gifted-charts only writes text on its slices, placed by its baseline three
  // quarters of the way out. Draw the icons ourselves, mid-ring.
  const iconCenters = computeDonutSliceCenters(
    footprintByCategories.map(({ footprint }) => footprint),
    radius,
    innerRadius,
    iconSize * 1.5,
  );

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <>
          <Skeleton
            colorMode={dark ? "dark" : "light"}
            radius="round"
            width={radius * 2}
            height={radius * 2}
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
        <>
          <PieChart
            donut
            radius={radius}
            innerRadius={innerRadius}
            innerCircleColor={colors.background}
            data={footprintByCategories.map((viewModel) => ({
              value: viewModel.footprint,
              color: palette[viewModel.styleKey],
            }))}
            centerLabelComponent={() => (
              <Text variant="titleLarge" style={{ textAlign: "center" }}>
                {`${formatTonnes(totalFootprint)}\ntCO2e/${t("year")}`}
              </Text>
            )}
          />
          {footprintByCategories.map((viewModel, index) => {
            const center = iconCenters[index];
            if (!center) return null;
            return (
              <View
                key={viewModel.category}
                pointerEvents="none"
                importantForAccessibility="no-hide-descendants"
                style={{
                  position: "absolute",
                  left: center.x - iconSize / 2,
                  top: center.y - iconSize / 2,
                }}
              >
                <Icon
                  source={viewModel.icon}
                  size={iconSize}
                  color={readableTextOn(palette[viewModel.styleKey])}
                />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};
