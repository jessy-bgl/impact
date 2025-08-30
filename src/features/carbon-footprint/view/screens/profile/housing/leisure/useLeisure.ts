import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useLeisure = () => {
  const questionKeys: Record<string, keyof Profile> = {
    swimmingPoolType: "logement . piscine . type",
    swimmingPoolSize: "logement . piscine . surface",
    outdoorEquipment: "logement . extérieur",
    holidaysLodging: "logement . vacances",
    secondHomeSeasons: "logement . vacances . résidence secondaire . saison",
    secondHomeLocation:
      "logement . vacances . résidence secondaire . localisation",
    secondHomeSurface: "logement . vacances . résidence secondaire . surface",
    secondHomeTimeSpentPerYear:
      "logement . vacances . résidence secondaire . durée",
    hotelNightsPerYear: "logement . vacances . hotel . nombre de nuitées",
    campingNightPerYear: "logement . vacances . camping . nombre de nuitées",
    youthHostelNightsPerYear:
      "logement . vacances . auberge de jeunesse . nombre de nuitées",
    rentalNightsPerYear: "logement . vacances . locations . nombre de nuitées",
    houseExchangeNightsPerYear:
      "logement . vacances . échange . nombre de nuitées",
  };

  const { updateHousingProfile } = useContext(UsecasesContext);

  const leisureQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(leisureQuestions);

  return {
    control,
    updateHousingProfile,
    leisureQuestions,
  };
};
