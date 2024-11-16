import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useOtherProducts = () => {
  const questionKeys = {
    expenses: "divers . autres produits . niveau de dépenses",
    relation: "divers . ameublement . préservation",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const otherQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(otherQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    otherQuestions,
  };
};
