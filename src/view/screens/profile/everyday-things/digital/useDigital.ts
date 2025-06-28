import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useDigital = () => {
  const questionKeys = {
    hoursPerDayOnInternet: "divers . numérique . internet . durée journalière",
    digitalDevices: "divers . numérique . appareils",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const digitalQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(digitalQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    digitalQuestions,
  };
};
