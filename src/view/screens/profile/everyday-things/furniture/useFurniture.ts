import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

export const useFurniture = () => {
  const questionKeys = {
    furniture: "divers . ameublement . meubles",
  } as const;

  const { updateEverydayThingsProfile } = useContext(UsecasesContext);

  const furnitureQuestions = useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(furnitureQuestions);

  return {
    control,
    updateEverydayThingsProfile,
    furnitureQuestions,
  };
};
