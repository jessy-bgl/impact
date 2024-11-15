import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const usePublicTransport = () => {
  const questionKeys = {
    trainKmPerYear: "transport . train . km",
    publicTransportUsage: "transport . transports commun",
    busHoursPerWeek: "transport . transports commun . bus . heures par semaine",
    coachKmPerWeek: "transport . transports commun . car . km par semaine",
    metroHoursPerWeek:
      "transport . transports commun . métro ou tram . heures par semaine",
  };

  const { updateTransportProfile } = useContext(UsecasesContext);

  const publicTransportQuestions =
    useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(publicTransportQuestions);

  return {
    control,
    updateTransportProfile,
    publicTransportQuestions,
  };
};
