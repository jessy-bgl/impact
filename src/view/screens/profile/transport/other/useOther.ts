import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useOther = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const otherQuestions = {
    gentleMobilityQuestion: questions["transport . mobilité douce"],
    ...questions["transport . mobilité douce"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    holidaysTransportQuestion: questions["transport . vacances"],
    ...questions["transport . vacances"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    kmPerYearByCamperVanQuestion:
      questions["transport . vacances . camping car . km"],
    kmPerYearByCaravanQuestion:
      questions["transport . vacances . caravane . distance"],
    kmPerYearByVanQuestion: questions["transport . vacances . van . km"],
    camperVanFuelConsumptionQuestion:
      questions["transport . vacances . camping car . consommation aux 100"],
    vanFuelConsumptionQuestion:
      questions["transport . vacances . van . consommation aux 100"],
  };

  const { control } = useProfileForm(otherQuestions);

  const annualFootprint = useAppStore(
    (store) =>
      store.footprints.transport.gentleMobilityFootprint +
      store.footprints.transport.holidaysTransportFootprint,
  );

  return {
    annualFootprint,
    control,
    updateTransportProfile,
    otherQuestions,
  };
};
