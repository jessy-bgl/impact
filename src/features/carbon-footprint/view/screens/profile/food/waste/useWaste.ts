import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useWaste = () => {
  const { questionKeys } = profileSections.waste;

  const { updateFoodProfile } = useContext(UsecasesContext);

  const wasteQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(wasteQuestions);

  return {
    control,
    updateFoodProfile,
    wasteQuestions,
  };
};
