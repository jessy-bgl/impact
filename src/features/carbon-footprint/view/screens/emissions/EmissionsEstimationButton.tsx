import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "react-native-paper";

import { EmissionsNavigatorProp } from "@app/EmissionsNavigator";
import {
  ProfileCompletion,
  isProfileCompleted,
  isProfileStarted,
} from "@carbonFootprint/domain/entities/profile/profileCompletion";
import { useProfile } from "@carbonFootprint/domain/hooks/useProfile";
import { posthog } from "@common/config/posthog";

export const EmissionsEstimationButton = () => {
  const { t } = useTranslation("emissions");

  const { colors } = useTheme();

  const { navigate } = useNavigation<EmissionsNavigatorProp>();

  const { profileCompletion } = useProfile();

  const estimationLabel = (completion: ProfileCompletion) => {
    if (isProfileCompleted(completion)) return "updateEstimate";
    return isProfileStarted(completion) ? "resumeEstimate" : "estimate";
  };

  const label = estimationLabel(profileCompletion);

  return (
    <Button
      icon="grass"
      mode="outlined"
      contentStyle={{ height: 48 }}
      labelStyle={{ color: colors.primary, fontWeight: "bold" }}
      style={{ borderColor: colors.primary }}
      onPress={() => {
        posthog.capture("footprint_estimation_started");
        navigate("Profile");
      }}
    >
      {t(label)}
    </Button>
  );
};
