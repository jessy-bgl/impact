import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useFurniture = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const furnitureQuestions = {
    furnitureQuestion: questions["divers . ameublement . meubles"],
    ...questions["divers . ameublement . meubles"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(furnitureQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.furnitureFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    furnitureQuestions,
  };
};
