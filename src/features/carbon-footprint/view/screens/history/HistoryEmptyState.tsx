import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { HistoryEmptyStateVariant } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { EmissionsEstimationButton } from "@carbonFootprint/view/screens/emissions/EmissionsEstimationButton";
import { HistoryChartPreview } from "@carbonFootprint/view/screens/history/HistoryChartPreview";
import { formatTonnes } from "@carbonFootprint/view/screens/history/historyFormat";

type Props = { variant: HistoryEmptyStateVariant };

export const HistoryEmptyState = ({ variant }: Props) => {
  const { t } = useTranslation("emissions");
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 32,
        paddingVertical: 32,
      }}
    >
      {/* Shows the reward rather than describing it: neither variant has a
          curve of its own to draw yet. */}
      <View style={{ marginBottom: 12 }}>
        <HistoryChartPreview />
      </View>

      <Text variant="titleMedium" style={{ textAlign: "center" }}>
        {t(`history.${variant.name}.title`)}
      </Text>

      {variant.name === "singleSnapshot" && (
        <Text variant="displaySmall" style={{ color: colors.primary }}>
          {`${formatTonnes(variant.value)} ${t("history.perYear")}`}
        </Text>
      )}

      <Text
        variant="bodyMedium"
        style={{ textAlign: "center", color: colors.onSurfaceVariant }}
      >
        {t(`history.${variant.name}.subtitle`)}
      </Text>

      {/* Both states are unblocked by the same act — answering more of the
          profile — so both offer the same button as the distribution screen,
          which already words itself for how far the profile has come. */}
      <View style={{ marginTop: 8 }}>
        <EmissionsEstimationButton />
      </View>
    </View>
  );
};
