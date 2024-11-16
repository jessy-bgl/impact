import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

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
