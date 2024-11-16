import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useClothes = () => {
  const questionKeys = {
    newClothersPerYear: "divers . textile . empreinte",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const clothesQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(clothesQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    clothesQuestions,
  };
};
