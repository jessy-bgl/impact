import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useHouseholdAppliances = () => {
  const questionKeys = {
    householdAppliances: "divers . électroménager . appareils",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const househouldAppliances =
    useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(househouldAppliances);

  return {
    control,
    updateEverydayThingsProfile,
    househouldAppliances,
  };
};
