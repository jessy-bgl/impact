import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useHobbies = () => {
  const { questionKeys } = profileSections.hobbies;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const hobbiesQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(hobbiesQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    hobbiesQuestions,
  };
};
