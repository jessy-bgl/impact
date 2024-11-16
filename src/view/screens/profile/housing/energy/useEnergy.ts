import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useEnergy = () => {
  const questionKeys = {
    photovoltaicPanel: "logement . électricité . photovoltaique . présent",
    photovoltaicProduction:
      "logement . électricité . photovoltaique . production",
    photovoltaicPart:
      "logement . électricité . photovoltaique . part autoconsommation",
    electricityConsumption: "logement . électricité . réseau . consommation",
    heatingEnergyType: "logement . chauffage",
    woodType: "logement . chauffage . bois . type",
    gasConsumption: "logement . chauffage . gaz . consommation",
    gasBottleConsumption: "logement . chauffage . bouteille gaz . consommation",
    gasPropaneConsumption:
      "logement . chauffage . citerne propane . consommation",
    fuelOilConsumption: "logement . chauffage . fioul . consommation",
    woodLogsConsumption:
      "logement . chauffage . bois . type . bûches . consommation",
    heatNetworkConsumption:
      "logement . chauffage . réseau de chaleur . consommation",
    bioGasContract: "logement . chauffage . gaz . biogaz",
    bioGasPart: "logement . chauffage . biogaz . part",
    airConditioningUsage: "logement . climatisation . présent",
    airConditioningNumber: "logement . climatisation . nombre",
  };

  const { updateHousingProfile } = useContext(UsecasesContext);

  const energyQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(energyQuestions);

  return {
    control,
    updateHousingProfile,
    energyQuestions,
  };
};
