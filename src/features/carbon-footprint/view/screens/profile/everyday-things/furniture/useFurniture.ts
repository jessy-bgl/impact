import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

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
