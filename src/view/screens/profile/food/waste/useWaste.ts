import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useWaste = () => {
  const { questions } = useQuestionsContext();
  const { updateFoodProfile } = useContext(UsecasesContext);

  const wasteQuestions = {
    wasteQuantityQuestion: questions["alimentation . déchets . quantité jetée"],
    ecoGestureQuestion: questions["alimentation . déchets . gestes"],
    ...questions["alimentation . déchets . gestes"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(wasteQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.wasteFootprint,
  );

  return {
    annualFootprint,
    control,
    updateFoodProfile,
    wasteQuestions,
  };
};
