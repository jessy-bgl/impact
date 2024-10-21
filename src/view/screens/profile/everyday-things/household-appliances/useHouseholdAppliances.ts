import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useHouseholdAppliances = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const househouldAppliances = {
    householdAppliancesQuestion:
      questions["divers . électroménager . appareils"],
    ...questions["divers . électroménager . appareils"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(househouldAppliances);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.householdApplicancesFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    househouldAppliances,
  };
};
