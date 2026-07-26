import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { resolveUnitAffix } from "@carbonFootprint/view/screens/profile/components/forms/fields/resolveUnitAffix";
import { NumericInput } from "@carbonFootprint/view/screens/profile/components/forms/inputs/NumericInput";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  affix?: string;
  style?: ViewStyle;
  step?: number;
};

export const NumericField = ({
  question,
  control,
  style,
  affix,
  step,
  handleUpdate,
}: Props) => {
  const { t } = useTranslation("common");
  const resolvedAffix = affix ?? resolveUnitAffix(t, question.unit);

  return (
    <ColumnContainer style={style}>
      <TextLabel question={question} />
      <Controller<FormValues>
        name={question.label}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <NumericInput
              question={question}
              right={
                resolvedAffix && (
                  <TextInput.Affix
                    text={resolvedAffix}
                    textStyle={{ fontSize: 14 }}
                  />
                )
              }
              onValueChange={(value: string) =>
                handleUpdate(question, Number(value))
              }
              onChangeText={onChange}
              value={value}
              step={step}
            />
          );
        }}
      />
    </ColumnContainer>
  );
};
