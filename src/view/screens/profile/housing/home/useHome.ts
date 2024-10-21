import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useHome = () => {
  const { questions } = useQuestionsContext();
  const { updateHousingProfile } = useContext(UsecasesContext);

  const housingQuestions = {
    homeTypeQuestion: questions["logement . type"],
    numberOfInhabitantsQuestion: questions["logement . habitants"],
    homeAgeQuestion: questions["logement . âge"],
    surfaceAreaQuestion: questions["logement . surface"],
    renovationWorkQuestion:
      questions["logement . construction . rénovation . travaux"],
    ...questions[
      "logement . construction . rénovation . travaux"
    ].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    photovoltaicPanelQuestion:
      questions["logement . électricité . photovoltaique . présent"],
    photovoltaicProductionQuestion:
      questions["logement . électricité . photovoltaique . production"],
  };

  const { control } = useProfileForm(housingQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.homeFootprint,
  );

  return {
    annualFootprint,
    control,
    updateHousingProfile,
    housingQuestions,
  };
};
