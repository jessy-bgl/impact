import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useOther = () => {
  const questionKeys: Record<string, keyof Profile> = {
    gentleMobility: "transport . mobilité douce",
    gentleMobilitySmallVehicleKmPerYear:
      "transport . mobilité douce . autres véhicules à moteur . km",
    gentleMobilityElectricBikeKmPerYear:
      "transport . mobilité douce . vae . km",
    holidaysTransport: "transport . vacances",
    kmPerYearByCamperVan: "transport . vacances . camping car . km",
    kmPerYearByCaravan: "transport . vacances . caravane . distance",
    kmPerYearByVan: "transport . vacances . van . km",
    camperVanFuelConsumption:
      "transport . vacances . camping car . consommation aux 100",
    vanFuelConsumption: "transport . vacances . van . consommation aux 100",
  };

  const { updateTransportProfile } = useContext(UsecasesContext);

  const otherQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(otherQuestions);

  return {
    control,
    updateTransportProfile,
    otherQuestions,
  };
};
