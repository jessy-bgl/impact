import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Divider, useTheme } from "react-native-paper";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import {
  FootprintCategory,
  FootprintSubCategory,
} from "@domain/entities/footprints/types";
import { useScrollProfileSection } from "@view/screens/profile/utils/ScrollProfileSectionContext";

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
