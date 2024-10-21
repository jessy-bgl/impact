import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const usePets = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const petsQuestions = {
    numberOfPetsQuestion: questions["divers . animaux domestiques . empreinte"],
    ...questions[
      "divers . animaux domestiques . empreinte"
    ].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(petsQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.petFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    petsQuestions,
  };
};
