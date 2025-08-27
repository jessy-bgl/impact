import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

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
