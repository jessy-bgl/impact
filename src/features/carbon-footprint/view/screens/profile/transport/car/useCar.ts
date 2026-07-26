import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useCar = () => {
  const { questionKeys } = profileSections.car;

  const { updateTransportProfile } = useContext(UsecasesContext);

  const carQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(carQuestions);

  return {
    control,
    updateTransportProfile,
    carQuestions,
  };
};
