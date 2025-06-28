import { useMemo } from "react";

import { useAppStore } from "@data/store/store";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/question/Question";

export const useGetQuestions = <T>(
  questionKeys: Record<string, keyof Profile>,
): Record<keyof T, Question> => {
  const ademeProfile = useAppStore((state) => state.profile.ademe);

  const questions: Record<keyof Profile, Question> = useMemo(() => {
    return AdemeFootprintEngine.getQuestions(
      ademeProfile,
      Object.values(questionKeys),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ademeProfile]);

  return Object.fromEntries(
    Object.entries(questionKeys).map(([key, value]) => {
      const question = questions[value];
      return [key, question];
    }),
  ) as Record<keyof T, Question>;
};
