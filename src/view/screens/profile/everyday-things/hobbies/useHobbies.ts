import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useHobbies = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const hobbiesQuestions = {
    culturalHobbiesQuestion: questions["divers . loisirs . culture"],
    ...questions["divers . loisirs . culture"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    sportHobbiesQuestion: questions["divers . loisirs . sports"],
    ...questions["divers . loisirs . sports"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(hobbiesQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.hobbiesFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    hobbiesQuestions,
  };
};
