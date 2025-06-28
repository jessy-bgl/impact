import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useConsumableProducts = () => {
  const questionKeys = {
    consumableProducts: "divers . produits consommables . consommation",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const consumableProductsQuestions =
    useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(consumableProductsQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    consumableProductsQuestions,
  };
};
