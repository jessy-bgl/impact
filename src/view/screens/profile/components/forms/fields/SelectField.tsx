import { Control, Controller } from "react-hook-form";
import { ViewStyle } from "react-native";

import { Question } from "@domain/entities/question/Question";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { SelectRadio } from "@view/screens/profile/components/forms/inputs/SelectRadio";
import { TextLabel } from "@view/screens/profile/components/forms/TextLabel";
import { FormValues } from "@view/screens/profile/utils/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  style?: ViewStyle;
};

export const SelectField = ({
  question,
  control,
  style,
  handleUpdate,
}: Props) => {
  return (
    <ColumnContainer style={style}>
      <TextLabel question={question} />
      <Controller<FormValues>
        name={question.label}
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectRadio
            question={question}
            value={value}
            onValueChange={(newValue: string) => {
              onChange(newValue);
              handleUpdate(question, newValue);
            }}
          />
        )}
      />
    </ColumnContainer>
  );
};
