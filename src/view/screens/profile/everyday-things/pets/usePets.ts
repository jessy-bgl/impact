import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const usePets = () => {
  const questionKeys = {
    numberOfPets: "divers . animaux domestiques . empreinte",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const petsQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(petsQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    petsQuestions,
  };
};
