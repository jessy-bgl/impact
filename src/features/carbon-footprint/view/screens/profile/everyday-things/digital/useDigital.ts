import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useDigital = () => {
  const { questionKeys } = profileSections.digital;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const digitalQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(digitalQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    digitalQuestions,
  };
};
