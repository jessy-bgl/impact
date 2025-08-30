import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

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
