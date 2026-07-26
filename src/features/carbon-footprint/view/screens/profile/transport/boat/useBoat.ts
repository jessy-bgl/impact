import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useBoat = () => {
  const { questionKeys } = profileSections.boat;

  const { updateTransportProfile } = useContext(UsecasesContext);

  const boatQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(boatQuestions);

  return {
    control,
    updateTransportProfile,
    boatQuestions,
  };
};
