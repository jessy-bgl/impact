import { useEffect } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { Question } from "@domain/entities/question/Question";
import { useQuestionsContext } from "@view/screens/profile/QuestionsContext";
import { FormValues } from "@view/screens/profile/utils/types";

export const useProfileForm = (categoryQuestions: Record<string, Question>) => {
  const { questions } = useQuestionsContext();

  const getDefaultValues = (): DefaultValues<FormValues> =>
    Object.values(categoryQuestions).reduce(
      (acc, question) => ({
        ...acc,
        [question.label]: question.defaultValue,
      }),
      {},
    );

  const { control, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    reset(getDefaultValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  return { control };
};
