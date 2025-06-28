import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useTobacco = () => {
  const questionKeys = {
    tobaccoConsumption: "divers . tabac . consommation par semaine",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const tobaccoQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(tobaccoQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    tobaccoQuestions,
  };
};
