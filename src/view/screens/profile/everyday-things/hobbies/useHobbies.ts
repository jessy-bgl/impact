import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

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
