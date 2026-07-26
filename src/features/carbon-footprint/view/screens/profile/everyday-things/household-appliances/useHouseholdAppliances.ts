import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useHouseholdAppliances = () => {
  const { questionKeys } = profileSections.householdAppliances;

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
