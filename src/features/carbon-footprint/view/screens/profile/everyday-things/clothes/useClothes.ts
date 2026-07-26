import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useClothes = () => {
  const { questionKeys } = profileSections.clothes;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const clothesQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(clothesQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    clothesQuestions,
  };
};
