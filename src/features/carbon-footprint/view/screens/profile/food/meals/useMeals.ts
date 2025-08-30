import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

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
