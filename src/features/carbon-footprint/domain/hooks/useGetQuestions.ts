import { useContext, useState } from "react";

import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

type Questions<T> = Record<keyof T, Question>;

export const useGetQuestions = <T>(
  questionKeys: Record<string, keyof Profile>,
): Questions<T> => {
  const ademeProfile = useAppStore((state) => state.profile.ademe);
  // The questions also depend on the engine situation, which is not
  // observable but is always followed by the footprints being stored: a new
  // footprints reference (startup synchronization) rebuilds them too.
  const footprints = useAppStore((state) => state.footprints);

  const { fetchQuestions } = useContext(UsecasesContext);

  const getQuestions = (previous: Partial<Questions<T>>): Questions<T> => {
    const questions = fetchQuestions(ademeProfile, Object.values(questionKeys));
    // An answer rebuilds every question of the section, but most of them end
    // up in the same state. Keeping their previous instance lets the memoized
    // question components skip their render.
    return Object.fromEntries(
      Object.entries(questionKeys).map(([key, label]) => {
        const question = questions[label];
        const previousQuestion = previous[key as keyof T];
        return [
          key,
          question && previousQuestion?.hasSameState(question)
            ? previousQuestion
            : question,
        ];
      }),
    ) as Questions<T>;
  };

  // The questions are derived state: they are rebuilt during the render that
  // sees a new profile or new footprints, from the ones built before.
  const [derived, setDerived] = useState(() => ({
    profile: ademeProfile,
    footprints,
    questions: getQuestions({}),
  }));

  if (derived.profile !== ademeProfile || derived.footprints !== footprints) {
    const questions = getQuestions(derived.questions);
    setDerived({ profile: ademeProfile, footprints, questions });
    return questions;
  }

  return derived.questions;
};
