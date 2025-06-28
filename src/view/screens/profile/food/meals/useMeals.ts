import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useMeals = () => {
  const questionKeys = {
    meals: "alimentation . plats",
    localProducts: "alimentation . local . consommation",
    breakfastType: "alimentation . petit déjeuner . type",
    milkType: "alimentation . type de lait",
    seasonalProducts: "alimentation . de saison . consommation",
  } as const;

  const { updateFoodProfile } = useContext(UsecasesContext);

  const mealsQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(mealsQuestions);

  return { control, updateFoodProfile, mealsQuestions };
};
