import { useEffect } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

export const useProfileForm = (categoryQuestions: Record<string, Question>) => {
  const { control, getValues, setValue } = useForm<FormValues>({
    defaultValues: getDefaultValues(categoryQuestions),
  });

  // An answer can change the defaults of other questions. Update only the
  // changed fields: `reset` would re-render the whole form. The form's
  // `defaultValues` stay the mount ones, which is fine since nothing uses
  // `isDirty` or `reset`.
  // Compare field by field with `getValues(label)`: labels contain dots, so
  // react-hook-form stores set values nested, while mount defaults are flat.
  // `getValues(label)` handles both cases.
  useEffect(() => {
    const defaultValues = getDefaultValues(categoryQuestions);
    for (const [label, value] of Object.entries(defaultValues)) {
      const name = label as keyof FormValues;
      if (getValues(name) !== value) setValue(name, value as string);
    }
  }, [categoryQuestions, getValues, setValue]);

  return { control };
};

const getDefaultValues = (
  categoryQuestions: Record<string, Question>,
): DefaultValues<FormValues> => {
  return Object.values(categoryQuestions).reduce((acc, question) => {
    if (!question) return acc;
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
