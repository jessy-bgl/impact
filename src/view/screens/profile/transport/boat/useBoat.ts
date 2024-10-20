import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useBoat = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const boatQuestions = {
    boatUsageQuestion: questions["transport . ferry . usager"],
    boatHoursPerYearQuestion: questions["transport . ferry . heures"],
  };

  const { control } = useProfileForm(boatQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.boatFootprint,
  );

  return {
    control,
    updateTransportProfile,
    annualFootprint,
    boatQuestions,
  };
};
