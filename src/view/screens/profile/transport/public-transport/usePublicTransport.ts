import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const usePublicTransport = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const publicTransportQuestions = {
    trainKmPerYearQuestion: questions["transport . train . km"],
    publicTransportUsageQuestion: questions["transport . transports commun"],
    ...questions["transport . transports commun"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    hoursPerWeekInBusQuestion:
      questions["transport . transports commun . bus . heures par semaine"],
    coachKmPerWeekQuestion:
      questions["transport . transports commun . car . km par semaine"],
    hoursPerWeekInMetroQuestion:
      questions[
        "transport . transports commun . métro ou tram . heures par semaine"
      ],
  };

  const { control } = useProfileForm(publicTransportQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.publicTransportFootprint,
  );

  return {
    control,
    updateTransportProfile,
    annualFootprint,
    publicTransportQuestions,
  };
};
