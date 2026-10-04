import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ProgressBar, Surface, Text, useTheme } from "react-native-paper";

import { computeProfileProgress } from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useProfileCompletion } from "@carbonFootprint/domain/hooks/useProfileCompletion";
import { EmissionsEstimationButton } from "@carbonFootprint/view/screens/emissions/EmissionsEstimationButton";

/**
 * Pinned under the summary: says why the call to action matters while the
 * profile is incomplete, then offers it. Once complete, only the update
 * action remains.
 */
export const EmissionsEstimationPanel = () => {
  const { t } = useTranslation("emissions");

  const { colors } = useTheme();

  const progress = computeProfileProgress(useProfileCompletion());

  return (
    <Surface
      elevation={2}
      style={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,
      }}
    >
      <View
        style={{ width: "100%", maxWidth: 400, alignSelf: "center", gap: 12 }}
      >
        {progress === 1 ? null : progress > 0 ? (
          <View style={{ gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Text variant="titleSmall">
                {t("estimationPanel.progressTitle")}
              </Text>
              <Text variant="labelLarge" style={{ color: colors.primary }}>
                {t("estimationPanel.progress", {
                  percent: Math.round(progress * 100),
                })}
              </Text>
            </View>
            <ProgressBar
              progress={progress}
              color={colors.primary}
              style={{ height: 6, borderRadius: 3 }}
            />
          </View>
        ) : (
          <View style={{ gap: 2 }}>
            <Text variant="titleSmall">
              {t("estimationPanel.notStartedTitle")}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              {t("estimationPanel.notStartedBody")}
            </Text>
          </View>
        )}
        <EmissionsEstimationButton />
      </View>
    </Surface>
  );
};
