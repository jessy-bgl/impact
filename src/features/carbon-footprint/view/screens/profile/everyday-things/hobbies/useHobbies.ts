import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

export const useHobbies = () => {
  const questionKeys = {
    culturalHobbies: "divers . loisirs . culture",
    sportHobbies: "divers . loisirs . sports",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const hobbiesQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(hobbiesQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    hobbiesQuestions,
  };
};
