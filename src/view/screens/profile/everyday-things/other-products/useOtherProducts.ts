import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useOtherProducts = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const otherQuestions = {
    expensesQuestion:
      questions["divers . autres produits . niveau de dépenses"],
    ...questions[
      "divers . autres produits . niveau de dépenses"
    ].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    relationQuestion: questions["divers . ameublement . préservation"],
  };

  const { control } = useProfileForm(otherQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.otherProductsFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    otherQuestions,
  };
};
