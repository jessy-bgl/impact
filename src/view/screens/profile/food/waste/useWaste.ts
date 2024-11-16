import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useWaste = () => {
  const questionKeys = {
    wasteQuantity: "alimentation . déchets . quantité jetée",
    ecoGesture: "alimentation . déchets . gestes",
  } as const;

  const { updateFoodProfile } = useContext(UsecasesContext);

  const wasteQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(wasteQuestions);

  return {
    control,
    updateFoodProfile,
    wasteQuestions,
  };
};
