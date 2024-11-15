import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const usePlane = () => {
  const questionKeys = {
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
