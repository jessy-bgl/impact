import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useHome = () => {
  const questionKeys = {
    homeType: "logement . type",
    numberOfInhabitants: "logement . habitants",
    homeAge: "logement . âge",
    surfaceArea: "logement . surface",
    renovationWork: "logement . construction . rénovation . travaux",
    photovoltaicPanel: "logement . électricité . photovoltaique . présent",
    photovoltaicProduction:
      "logement . électricité . photovoltaique . production",
  };

  const { updateHousingProfile } = useContext(UsecasesContext);

  const housingQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(housingQuestions);

  return {
    control,
    updateHousingProfile,
    housingQuestions,
  };
};
