import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const usePublicTransport = () => {
  const questionKeys: Record<string, keyof Profile> = {
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
