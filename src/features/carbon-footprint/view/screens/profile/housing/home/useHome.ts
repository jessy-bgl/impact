import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useHome = () => {
  const questionKeys: Record<string, keyof Profile> = {
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
