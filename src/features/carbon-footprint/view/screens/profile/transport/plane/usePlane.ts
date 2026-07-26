import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const usePlane = () => {
  const { questionKeys } = profileSections.plane;

  const { updateTransportProfile } = useContext(UsecasesContext);

  const planeQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(planeQuestions);

  return {
    control,
    updateTransportProfile,
    planeQuestions,
  };
};
