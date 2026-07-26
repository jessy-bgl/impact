import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useLeisure = () => {
  const { questionKeys } = profileSections.leisure;

  const { updateHousingProfile } = useContext(UsecasesContext);

  const leisureQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(leisureQuestions);

  return {
    control,
    updateHousingProfile,
    leisureQuestions,
  };
};
