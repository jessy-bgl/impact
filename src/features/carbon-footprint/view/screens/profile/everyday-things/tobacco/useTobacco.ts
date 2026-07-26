import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useTobacco = () => {
  const { questionKeys } = profileSections.tobacco;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const tobaccoQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(tobaccoQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    tobaccoQuestions,
  };
};
