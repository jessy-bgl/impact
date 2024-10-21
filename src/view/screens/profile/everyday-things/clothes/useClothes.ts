import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useClothes = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const clothesQuestions = {
    newClothersPerYearQuestion: questions["divers . textile . empreinte"],
    ...questions["divers . textile . empreinte"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(clothesQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.clothesFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    clothesQuestions,
  };
};
