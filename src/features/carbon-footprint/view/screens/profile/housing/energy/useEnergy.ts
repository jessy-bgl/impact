import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useEnergy = () => {
  const { questionKeys } = profileSections.energy;

  const { updateHousingProfile } = useContext(UsecasesContext);

  const energyQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(energyQuestions);

  return {
    control,
    updateHousingProfile,
    energyQuestions,
  };
};
