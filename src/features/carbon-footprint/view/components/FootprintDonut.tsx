import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Icon, Text, useTheme } from "react-native-paper";

import { FootprintCategoryViewModel } from "@carbonFootprint/domain/entities/footprints/FootprintViewModel";
import { computeDonutSliceCenters } from "@carbonFootprint/view/components/donutSliceCenters";
import { useCategoryPalette } from "@carbonFootprint/view/theme/categoryPalette";
import { formatTonnes } from "@common/utils/formatTonnes";
import { readableTextOn } from "@common/utils/readableTextOn";
import { Skeleton } from "moti/skeleton";

const innerRadiusRatio = 0.6;

type Props = {
  isLoading: boolean;
  /** The slices, clockwise from 12 o'clock. */
  categories: FootprintCategoryViewModel[];
  totalFootprint: number;
  radius: number;
};

export const FootprintDonut = ({
  isLoading,
  categories,
  totalFootprint,
  radius,
}: Props) => {
  const { t } = useTranslation("emissions");

  const { colors, dark } = useTheme();

  const palette = useCategoryPalette();

  const innerRadius = radius * innerRadiusRatio;
  const iconSize = Math.max(14, Math.round((radius - innerRadius) * 0.4));

  // gifted-charts cannot center icons mid-ring: draw them ourselves.
  const iconCenters = computeDonutSliceCenters(
    categories.map(({ footprint }) => footprint),
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
            strokeWidth={2}
            strokeColor={colors.background}
            data={categories.map((viewModel) => ({
              value: viewModel.footprint,
              color: palette[viewModel.styleKey],
            }))}
            centerLabelComponent={() => (
              <View style={{ alignItems: "center" }}>
                <Text
                  variant={radius >= 100 ? "headlineSmall" : "titleMedium"}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatTonnes(totalFootprint)}
                </Text>
                <Text
                  variant="labelSmall"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ color: colors.onSurfaceVariant }}
                >
                  {t("common:footprintTonnesPerYear")}
                </Text>
              </View>
            )}
          />
          {categories.map((viewModel, index) => {
            const center = iconCenters[index];
            if (!center) return null;
            return (
              <View
                key={viewModel.styleKey}
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
