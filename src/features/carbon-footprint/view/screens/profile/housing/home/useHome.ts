import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useHome = () => {
  const { questionKeys } = profileSections.home;

  const { updateHousingProfile } = useContext(UsecasesContext);

  const housingQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(housingQuestions);

  return {
    control,
    updateHousingProfile,
    housingQuestions,
  };
};
