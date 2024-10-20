import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useConsumableProducts = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const consumableProductsQuestions = {
    consumableProductsQuestion:
      questions["divers . produits consommables . consommation"],
    ...questions[
      "divers . produits consommables . consommation"
    ].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(consumableProductsQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.consumableProductsFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    consumableProductsQuestions,
  };
};
