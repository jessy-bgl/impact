import { useContext } from "react";

import { UsecasesContext } from "@common/UsecasesContext";
import { useGetQuestions } from "@view/screens/profile/utils/useGetQuestions";
import { useProfileForm } from "@view/screens/profile/utils/useProfileForm";

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
