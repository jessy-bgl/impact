import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const usePets = () => {
  const { questionKeys } = profileSections.pets;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const petsQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(petsQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    petsQuestions,
  };
};
