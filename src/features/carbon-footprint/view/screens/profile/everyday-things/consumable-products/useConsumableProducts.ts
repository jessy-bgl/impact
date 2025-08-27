import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

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
