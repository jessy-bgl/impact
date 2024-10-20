import { Control, Controller } from "react-hook-form";
import { ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

import { Question } from "@domain/entities/question/Question";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { NumericInput } from "@view/screens/profile/components/forms/inputs/NumericInput";
import { TextLabel } from "@view/screens/profile/components/forms/TextLabel";
import { FormValues } from "@view/screens/profile/utils/types";

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
              right={affix && <TextInput.Affix text={affix} />}
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
