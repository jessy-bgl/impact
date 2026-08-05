import { useContext, useEffect, useMemo } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

export const useGetQuestions = <T>(
  questionKeys: Record<string, keyof Profile>,
): Record<keyof T, Question> => {
  const ademeProfile = useAppStore((state) => state.profile.ademe);

  const { fetchQuestions, initMosaicAnswers } = useContext(UsecasesContext);

  const questions: Record<keyof Profile, Question> = useMemo(() => {
    return fetchQuestions(ademeProfile, Object.values(questionKeys));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ademeProfile]);

  // Unchecked mosaic options must be persisted as "non", otherwise the engine
  // keeps their follow-up questions applicable. Idempotent: the next run finds
  // every option answered and writes nothing.
  useEffect(() => {
    initMosaicAnswers(Object.values(questions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  return Object.fromEntries(
    Object.entries(questionKeys).map(([key, value]) => {
      const question = questions[value];
      return [key, question];
    }),
  ) as Record<keyof T, Question>;
};
