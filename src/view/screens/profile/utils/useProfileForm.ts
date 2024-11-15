import { useEffect } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { useAppStore } from "@data/store/store";
import { Question } from "@domain/entities/question/Question";
import { FormValues } from "@view/screens/profile/utils/types";

export const useProfileForm = (categoryQuestions: Record<string, Question>) => {
  const ademeProfile = useAppStore((state) => state.profile.ademe);

  const getDefaultValues = (): DefaultValues<FormValues> => {
    return Object.values(categoryQuestions).reduce((acc, question) => {
      if (question.subQuestions) {
        return {
          ...question.subQuestions.reduce((acc, subQuestion) => {
            return {
              ...acc,
              [subQuestion.label]: subQuestion.defaultValue,
            };
          }, acc),
          [question.label]: question.defaultValue,
        };
      }
      return {
        ...acc,
        [question.label]: question.defaultValue,
      };
    }, {});
  };

  const { control, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    reset(getDefaultValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ademeProfile]);

  return { control };
};
