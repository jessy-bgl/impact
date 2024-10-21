import { Control, Controller } from "react-hook-form";
import { ViewStyle } from "react-native";

import { Question } from "@domain/entities/question/Question";
import { ColumnContainer } from "@view/screens/profile/components/ColumnContainer";
import { SelectCheckbox } from "@view/screens/profile/components/forms/inputs/SelectCheckbox";
import { TextLabel } from "@view/screens/profile/components/forms/TextLabel";
import { FormValues } from "@view/screens/profile/utils/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  style?: ViewStyle;
  labelFlex?: number;
  inputFlex?: number;
};

export const SelectFields = ({
  question,
  control,
  style,
  handleUpdate,
  labelFlex,
  inputFlex,
}: Props) => {
  if (!question.subQuestions) return;

  return (
    <ColumnContainer style={style}>
      <TextLabel question={question} />
      {question.subQuestions
        .filter((subQuestion) => !subQuestion.isInactive)
        .map((subQuestion) => (
          <Controller<FormValues>
            key={subQuestion.label}
            name={subQuestion.label}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <SelectCheckbox
                  key={subQuestion.label}
                  question={subQuestion}
                  status={value === "oui" ? "checked" : "unchecked"}
                  value={value}
                  onPress={() => {
                    const newValue = value === "oui" ? "non" : "oui";
                    onChange(newValue);
                    handleUpdate(subQuestion, newValue);
                  }}
                />
              );
            }}
          />
        ))}
    </ColumnContainer>
  );

  // return (
  //   <ColumnContainer style={style}>
  //     <TextLabel question={question} style={{ flex: labelFlex }} />
  //     <Controller<FormValues>
  //       name={question.label}
  //       control={control}
  //       render={({ field: { onChange, value } }) => (
  //         <SelectSegmented
  //           question={question}
  //           direction={question.options?.length === 2 ? "row" : "column"}
  //           style={{ flex: inputFlex }}
  //           options={question.options!}
  //           value={value}
  //           onValueChange={(newValue: string) => {
  //             onChange(newValue);
  //             handleUpdate(question, newValue);
  //           }}
  //         />
  //       )}
  //     />
  //   </ColumnContainer>
  // );
};
