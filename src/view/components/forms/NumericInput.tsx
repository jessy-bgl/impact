import { TextInput, TextInputProps } from "react-native-paper";

import { Question } from "@domain/entities/Question";

type Props = TextInputProps & {
  question: Question;
  positive?: boolean;
};

export const NumericInput = ({
  question,
  positive = true,
  ...props
}: Props) => {
  const dense = props.dense ?? true;
  const mode = props.mode ?? "outlined";
  const min =
    question.minValue !== undefined
      ? question.minValue
      : positive
        ? 0
        : undefined;

  return (
    <TextInput
      {...props}
      keyboardType="numeric"
      dense={dense}
      mode={mode}
      onChangeText={(text) => {
        if (!props.onChangeText) return;
        const isNumber = /^\d*\.?\d*$/.test(text);
        if (!isNumber) return;
        if (positive && text.includes("-")) return;
        props.onChangeText(text);
      }}
      onBlur={(e) => {
        if (props.onChangeText && e.target.value === "")
          props.onChangeText(min !== undefined ? min.toString() : "0");
        if (!props.onBlur) return;
        props.onBlur(e);
      }}
    />
  );
};
