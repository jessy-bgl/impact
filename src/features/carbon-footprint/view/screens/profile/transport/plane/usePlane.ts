import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const usePlane = () => {
  const questionKeys: Record<string, keyof Profile> = {
    planeUsage: "transport . avion . usager",
    hoursPerYearInShortHaul:
      "transport . avion . court courrier . heures de vol",
    hoursPerYearInMediumHaul:
      "transport . avion . moyen courrier . heures de vol",
    hoursPerYearInLongHaul: "transport . avion . long courrier . heures de vol",
  };

  const { updateTransportProfile } = useContext(UsecasesContext);

  const planeQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(planeQuestions);

  return {
    control,
    updateTransportProfile,
    planeQuestions,
  };
};
