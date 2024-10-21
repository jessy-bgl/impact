import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useDrinks = () => {
  const { questions } = useQuestionsContext();
  const { updateFoodProfile } = useContext(UsecasesContext);

  const drinksQuestions = {
    hotDrinksQuestion: questions["alimentation . boisson . chaude"],
    ...questions["alimentation . boisson . chaude"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    sodaConsumptionQuestion:
      questions["alimentation . boisson . sucrées . litres"],
    alcoholConsumptionQuestion:
      questions["alimentation . boisson . alcool . litres"],
    bottleWaterConsumptionQuestion:
      questions["alimentation . boisson . eau en bouteille . consommateur"],
  };

  const { control } = useProfileForm(drinksQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.food.drinksFootprint,
  );

  return {
    annualFootprint,
    control,
    updateFoodProfile,
    drinksQuestions,
  };
};
