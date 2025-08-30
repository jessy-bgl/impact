import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useCar = () => {
  const questionKeys = {
    kmPerYear: "transport . voiture . km",
    averagePassengers: "transport . voiture . voyageurs",
    regularUsageOfSameCar: "transport . voiture . utilisateur",
    carSize: "transport . voiture . gabarit",
    carEngine: "transport . voiture . motorisation",
    carFuelType: "transport . voiture . thermique . carburant",
    carFuelConsumption:
      "transport . voiture . thermique . consommation aux 100",
    carElectricityConsumption:
      "transport . voiture . électrique . consommation aux 100",
  } as const;

  const { updateTransportProfile } = useContext(UsecasesContext);

  const carQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(carQuestions);

  return {
    control,
    updateTransportProfile,
    carQuestions,
  };
};
