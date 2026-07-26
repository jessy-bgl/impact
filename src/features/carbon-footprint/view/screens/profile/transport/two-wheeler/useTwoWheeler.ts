import { useContext } from "react";

import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useTwoWheeler = () => {
  const { questionKeys } = profileSections.twoWheeler;

  const { updateTransportProfile } = useContext(UsecasesContext);

  const twoWheelerQuestions =
    useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(twoWheelerQuestions);

  return {
    control,
    updateTransportProfile,
    twoWheelerQuestions,
  };
};
