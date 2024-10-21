import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useAppStore } from "@data/store/store";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useCar = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const carQuestions = {
    kmPerYearQuestion: questions["transport . voiture . km"],
    averagePassengersQuestion: questions["transport . voiture . voyageurs"],
    regularUsageOfSameCarQuestion:
      questions["transport . voiture . utilisateur"],
    carSizeQuestion: questions["transport . voiture . gabarit"],
    carEngineQuestion: questions["transport . voiture . motorisation"],
    carFuelTypeQuestion:
      questions["transport . voiture . thermique . carburant"],
    carFuelConsumptionQuestion:
      questions["transport . voiture . thermique . consommation aux 100"],
    carElectricityConsumptionQuestion:
      questions["transport . voiture . électrique . consommation aux 100"],
  };

  const { control } = useProfileForm(carQuestions);

  const annualFootprint = useAppStore(
    (store) => store.footprints.transport.carFootprint,
  );

  return {
    annualFootprint,
    control,
    updateTransportProfile,
    carQuestions,
  };
};
