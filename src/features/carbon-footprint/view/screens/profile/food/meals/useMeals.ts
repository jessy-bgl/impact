import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useMeals = () => {
  const { questionKeys } = profileSections.meals;

  const { updateFoodProfile } = useContext(UsecasesContext);

  const mealsQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(mealsQuestions);

  return { control, updateFoodProfile, mealsQuestions };
};
