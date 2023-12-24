import { TextInput, TextInputProps } from "react-native-paper";

type Props = TextInputProps & {
  positive?: boolean;
  min?: number;
};

export const NumericInput = (props: Props) => {
  const positive = props.positive ?? true;
  const dense = props.dense ?? true;
  const mode = props.mode ?? "outlined";
  const min = props.min !== undefined ? props.min : positive ? 0 : undefined;

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
