import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useFurniture = () => {
  const { questionKeys } = profileSections.furniture;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const furnitureQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(furnitureQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    furnitureQuestions,
  };
};
