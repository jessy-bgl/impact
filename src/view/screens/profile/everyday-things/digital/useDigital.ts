import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useDigital = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const digitalQuestions = {
    hoursPerDayOnInternetQuestion:
      questions["divers . numérique . internet . durée journalière"],
    digitalDevicesQuestion: questions["divers . numérique . appareils"],
    ...questions["divers . numérique . appareils"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
  };

  const { control } = useProfileForm(digitalQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.digitalFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    digitalQuestions,
  };
};
