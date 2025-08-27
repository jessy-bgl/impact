import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Divider, useTheme } from "react-native-paper";

import { useAppStore } from "@carbonFootprint/data/store/store";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/types";
import { useScrollProfileSection } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { UsecasesContext } from "@common/UsecasesContext";

export const ValidateResponsesButton = ({
  category,
  subCategory,
}: {
  category: FootprintCategory;
  subCategory: FootprintSubCategory;
}) => {
  const { t } = useTranslation(["transport", "emissions", "common"]);

  const { colors } = useTheme();

  const { resetExpandedSection } = useScrollProfileSection();

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
          updateProfileCompletion(category, subCategory, true);
          resetExpandedSection();
        }}
        style={{ padding: 0, margin: "auto" }}
        icon="check"
      >
        {t("emissions:validateResponses")}
      </Button>
    </>
  );
};
