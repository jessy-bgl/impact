import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useTwhoWheeler = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const twoWheelerQuestions = {
    kmPerYearQuestion: questions["transport . deux roues . km"],
    twoWheelerEngineQuestion: questions["transport . deux roues . type"],
    twoWheelerUsageQuestion: questions["transport . deux roues . usager"],
  };

  const { control } = useProfileForm(twoWheelerQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.twoWheelerFootprint,
  );

  return {
    annualFootprint,
    control,
    updateTransportProfile,
    twoWheelerQuestions,
  };
};
