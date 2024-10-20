import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useLeisure = () => {
  const { questions } = useQuestionsContext();
  const { updateHousingProfile } = useContext(UsecasesContext);

  const leisureQuestions = {
    swimmingPoolTypeQuestion: questions["logement . piscine . type"],
    swimmingPoolSizeQuestion: questions["logement . piscine . surface"],
    outdoorEquipmentQuestion: questions["logement . extérieur"],
    ...questions["logement . extérieur"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    holidaysLodgingQuestion: questions["logement . vacances"],
    ...questions["logement . vacances"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, Question>,
    ),
    secondHomeSeasonsQuestion:
      questions["logement . vacances . résidence secondaire . saison"],
    secondHomeLocationQuestion:
      questions["logement . vacances . résidence secondaire . localisation"],
    secondHomeSurfaceQuestion:
      questions["logement . vacances . résidence secondaire . surface"],
    secondHomeTimeSpentPerYearQuestion:
      questions["logement . vacances . résidence secondaire . durée"],
    hotelNightsPerYearQuestion:
      questions["logement . vacances . hotel . nombre de nuitées"],
    campingNightPerYearQuestion:
      questions["logement . vacances . camping . nombre de nuitées"],
    youthHostelNightsPerYearQuestion:
      questions[
        "logement . vacances . auberge de jeunesse . nombre de nuitées"
      ],
    rentalNightsPerYearQuestion:
      questions["logement . vacances . locations . nombre de nuitées"],
    houseExchangeNightsPerYearQuestion:
      questions["logement . vacances . échange . nombre de nuitées"],
  };

  const { control } = useProfileForm(leisureQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.leisureFootprint,
  );

  return {
    annualFootprint,
    control,
    updateHousingProfile,
    leisureQuestions,
  };
};
