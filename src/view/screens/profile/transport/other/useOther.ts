import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useOther = () => {
  const questionKeys = {
    gentleMobility: "transport . mobilité douce",
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
