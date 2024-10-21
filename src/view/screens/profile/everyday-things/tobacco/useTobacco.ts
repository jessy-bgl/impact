import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useTobacco = () => {
  const { questions } = useQuestionsContext();
  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const tobaccoQuestions = {
    tobaccoConsumptionQuestion:
      questions["divers . tabac . consommation par semaine"],
  };

  const { control } = useProfileForm(tobaccoQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.tobaccoFootprint,
  );

  return {
    annualFootprint,
    control,
    updateEverydayThingsProfile,
    tobaccoQuestions,
  };
};
