import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

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
