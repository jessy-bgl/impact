import { useContext } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/UsecasesContext";

export const useClothes = () => {
  const questionKeys: Record<string, keyof Profile> = {
    newClothersPerYear: "divers . textile . empreinte précise",
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
