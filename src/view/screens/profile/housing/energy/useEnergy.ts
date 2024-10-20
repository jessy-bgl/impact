import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useEnergy = () => {
  const { questions } = useQuestionsContext();
  const { updateHousingProfile } = useContext(UsecasesContext);

  const energyQuestions = {
    photovoltaicPanelQuestion:
      questions["logement . électricité . photovoltaique . présent"],
    photovoltaicProductionQuestion:
      questions["logement . électricité . photovoltaique . production"],
    photovoltaicPartQuestion:
      questions[
        "logement . électricité . photovoltaique . part autoconsommation"
      ],
    electricityConsumptionQuestion:
      questions["logement . électricité . réseau . consommation"],
    heatingEnergyTypeQuestion: questions["logement . chauffage"],
    ...questions["logement . chauffage"].subQuestions?.reduce(
      (acc, question) => {
        acc[question.label] = question;
        return acc;
      },
      {} as Record<string, any>,
    ),
    woodTypeQuestion: questions["logement . chauffage . bois . type"],
    gasConsumptionQuestion:
      questions["logement . chauffage . gaz . consommation"],
    gasBottleConsumptionQuestion:
      questions["logement . chauffage . bouteille gaz . consommation"],
    gasPropaneConsumptionQuestion:
      questions["logement . chauffage . citerne propane . consommation"],
    fuelOilConsumptionQuestion:
      questions["logement . chauffage . fioul . consommation"],
    woodLogsConsumptionQuestion:
      questions["logement . chauffage . bois . type . bûches . consommation"],
    heatNetworkConsumptionQuestion:
      questions["logement . chauffage . réseau de chaleur . consommation"],
    bioGasContractQuestion: questions["logement . chauffage . gaz . biogaz"],
    bioGasPartQuestion: questions["logement . chauffage . biogaz . part"],
    airConditioningUsageQuestion:
      questions["logement . climatisation . présent"],
    airConditioningNumberQuestion:
      questions["logement . climatisation . nombre"],
  };

  const { control } = useProfileForm(energyQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.housing.energyFootprint,
  );

  return {
    annualFootprint,
    control,
    updateHousingProfile,
    energyQuestions,
  };
};
