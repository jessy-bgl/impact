import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { Profile } from "@domain/entities/profile/Profile";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

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
