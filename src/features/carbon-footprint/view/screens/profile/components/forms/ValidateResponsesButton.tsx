import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";

import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import {
  PROFILE_TOUR_STEP_IDS,
  PROFILE_TOUR_TARGETS,
} from "@carbonFootprint/domain/entities/tour/profileTour";
import { useProfileCompletionCelebration } from "@carbonFootprint/view/screens/profile/ProfileCompletionCelebrationContext";
import { useScrollProfileSection } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { posthog } from "@common/config/posthog";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";
import { useTourStepAvailability } from "@common/tour/useTourStepAvailability";
import { useTourTarget } from "@common/tour/useTourTarget";

type Props = {
  category: FootprintCategory;
  subCategory: FootprintSubCategory;
};

export const ValidateResponsesButton = ({ category, subCategory }: Props) => {
  const { t } = useTranslation(["emissions", "common"]);

  const { colors } = useTheme();

  const { resetExpandedSection } = useScrollProfileSection();

  const { celebrate } = useProfileCompletionCelebration();

  const { updateProfileCompletion } = useContext(UsecasesContext);

  const isCompleted = useAppStore((state) => {
    const completion = state.profile.completion[category];
    return completion
      ? (completion as Record<string, boolean>)[subCategory]
      : false;
  });

  const validateTourRef = useTourTarget(PROFILE_TOUR_TARGETS.validateButton);

  // Already-validated sections render no button, so the tour drops that step
  // instead of waiting for a target that will never mount.
  useTourStepAvailability(PROFILE_TOUR_STEP_IDS.validateButton, !isCompleted);

  if (isCompleted) return;

  return (
    <>
      <Divider
        style={{
          marginVertical: 14,
          backgroundColor: colors.surfaceDisabled,
        }}
      />
      <View ref={validateTourRef} collapsable={false}>
        <Button
          compact
          mode="outlined"
          onPress={() => {
            posthog.capture("profile_section_completed", {
              category,
              sub_category: subCategory,
            });
            const { profileJustCompleted } = updateProfileCompletion({
              category,
              subCategory,
              completed: true,
            });
            resetExpandedSection();
            if (profileJustCompleted) celebrate();
          }}
          style={{ padding: 0, margin: "auto" }}
          icon="check"
        >
          {t("emissions:validateResponses")}
        </Button>
      </View>
    </>
  );
};
