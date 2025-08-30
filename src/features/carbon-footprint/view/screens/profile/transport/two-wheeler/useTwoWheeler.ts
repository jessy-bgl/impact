import { useContext } from "react";

import { useGetQuestions } from "@carbonFootprint/domain/hooks/useGetQuestions";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const useTwoWheeler = () => {
  const questionKeys = {
    kmPerYear: "transport . deux roues . km",
    twoWheelerEngine: "transport . deux roues . type",
    twoWheelerUsage: "transport . deux roues . usager",
  } as const;

  const { updateTransportProfile } = useContext(UsecasesContext);

  const twoWheelerQuestions =
    useGetQuestions<typeof questionKeys>(questionKeys);

  const { control } = useProfileForm(twoWheelerQuestions);

  return {
    control,
    updateTransportProfile,
    twoWheelerQuestions,
  };
};
