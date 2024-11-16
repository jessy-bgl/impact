import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useLeisure = () => {
  const questionKeys = {
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
