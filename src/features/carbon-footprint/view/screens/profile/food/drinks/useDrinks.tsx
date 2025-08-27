import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

export const useDrinks = () => {
  const questionKeys = {
    hotDrinks: "alimentation . boisson . chaude",
    sodaConsumption: "alimentation . boisson . sucrées . litres",
    alcoholConsumption: "alimentation . boisson . alcool . litres",
    bottleWaterConsumption:
      "alimentation . boisson . eau en bouteille . consommateur",
  } as const;

  const { updateFoodProfile } = useContext(UsecasesContext);

  const drinksQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(drinksQuestions);

  return {
    control,
    updateFoodProfile,
    drinksQuestions,
  };
};
