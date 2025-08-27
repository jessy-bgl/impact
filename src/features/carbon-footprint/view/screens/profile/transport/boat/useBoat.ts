import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

export const useBoat = () => {
  const questionKeys: Record<string, keyof Profile> = {
    boatUsage: "transport . ferry . usager",
    boatHoursPerYear: "transport . ferry . heures",
  };

  const { updateTransportProfile } = useContext(UsecasesContext);

  const boatQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(boatQuestions);

  return {
    control,
    updateTransportProfile,
    boatQuestions,
  };
};
