import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

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
