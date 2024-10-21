import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const usePlane = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const planeQuestions = {
    planeUsageQuestion: questions["transport . avion . usager"],
    hoursPerYearInShortHaulQuestion:
      questions["transport . avion . court courrier . heures de vol"],
    hoursPerYearInMediumHaulQuestion:
      questions["transport . avion . moyen courrier . heures de vol"],
    hoursPerYearInLongHaulQuestion:
      questions["transport . avion . long courrier . heures de vol"],
  };

  const { control } = useProfileForm(planeQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.planeFootprint,
  );

  return {
    annualFootprint,
    control,
    updateTransportProfile,
    planeQuestions,
  };
};
