import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useMeals = () => {
  const { questions } = useQuestionsContext();
  const { updateFoodProfile } = useContext(UsecasesContext);

  const mealsQuestions = {
    mealsQuestion: questions["alimentation . plats"],
    ...questions["alimentation . plats"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    localProductsQuestions: questions["alimentation . local . consommation"],
    breakfastTypeQuestion: questions["alimentation . petit déjeuner . type"],
    milkTypeQuestion: questions["alimentation . type de lait"],
    seasonalProductsQuestion:
      questions["alimentation . de saison . consommation"],
  };

  const { control } = useProfileForm(mealsQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.mealsFootprint,
  );

  return { annualFootprint, control, updateFoodProfile, mealsQuestions };
};
