import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Divider, useTheme } from "react-native-paper";

import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { useProfileCompletionCelebration } from "@carbonFootprint/view/screens/profile/ProfileCompletionCelebrationContext";
import { useScrollProfileSection } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { posthog } from "@common/config/posthog";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

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

  if (isCompleted) return;

  return (
    <>
      <Divider
        style={{
          marginVertical: 14,
          backgroundColor: colors.surfaceDisabled,
        }}
      />
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
    </>
  );
};
