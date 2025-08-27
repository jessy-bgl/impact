import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

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
