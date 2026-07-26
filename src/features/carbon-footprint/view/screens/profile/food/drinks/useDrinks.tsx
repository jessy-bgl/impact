import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useDrinks = () => {
  const { questionKeys } = profileSections.drinks;

  const { updateFoodProfile } = useContext(UsecasesContext);

  const drinksQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(drinksQuestions);

  return {
    control,
    updateFoodProfile,
    drinksQuestions,
  };
};
