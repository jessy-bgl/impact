import { Question } from "@domain/entities/question/Question";
import { View } from "moti";
import { TextStyle } from "react-native";
import {
  Button,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";

type Props = TextInputProps & {
  question: Question;
  onValueChange: (value: string) => void;
  positive?: boolean;
  step?: number;
  maxWidth?: number;
};

export const NumericInput = ({
  question,
  onValueChange,
  positive = true,
  step = 1,
  maxWidth = 290,
  ...props
}: Props) => {
  const { colors } = useTheme();

  const dense = props.dense ?? true;
  const mode = props.mode ?? "outlined";
  const min =
    question.minValue !== undefined
      ? question.minValue
      : positive
        ? 0
        : undefined;
  const max = question.maxValue;
  const value = props.value;
  const textColor = question.isEngineDefaultValueUsed
    ? colors.onSurfaceDisabled
    : undefined;

  const isDecreaseDisabled =
    min !== undefined && value !== undefined && Number(value) <= min;
  const isIncreaseDisabled =
    max !== undefined && value !== undefined && Number(value) >= max;

  const handleIncrement = () => {
    if (props.onChangeText && value !== undefined) {
      const currentValue = Number(value);
      if (max === undefined || (max !== undefined && currentValue < max)) {
        let newValue = Math.round(currentValue + step);
        if (max !== undefined && newValue > max) newValue = max;
        props.onChangeText(newValue.toString());
        onValueChange(newValue.toString());
      }
    }
  };

  const handleDecrement = () => {
    if (props.onChangeText && value !== undefined) {
      const currentValue = Number(value);
      if (min === undefined || (min !== undefined && currentValue > min)) {
        let newValue = Math.round(currentValue - step);
        if (min !== undefined && newValue < min) newValue = min;
        props.onChangeText(newValue.toString());
        onValueChange(newValue.toString());
      }
    }
  };

  return (
    <View
      style={{
        ...(props.style as TextStyle),
        flexDirection: "row",
        gap: 10,
        maxWidth: maxWidth,
        alignSelf: "center",
      }}
    >
      <Button
        mode="outlined"
        disabled={isDecreaseDisabled}
        onPress={handleDecrement}
        textColor={colors.tertiary}
        labelStyle={{ marginHorizontal: 0 }}
        style={{
          flex: 0,
          borderColor: isDecreaseDisabled ? undefined : colors.tertiary,
          alignSelf: "center",
        }}
      >
        {`-${step}`}
      </Button>
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
          const enteredValue = e.target.value;
          if (props.onChangeText !== undefined) {
            if (enteredValue === "")
              props.onChangeText(min !== undefined ? min.toString() : "0");
            else if (min !== undefined && Number(enteredValue) < min)
              props.onChangeText(min.toString());
          }
          onValueChange(enteredValue);
        }}
        textColor={textColor}
        style={{ ...(props.style as TextStyle), flex: 1 }}
      />
      <Button
        mode="outlined"
        disabled={isIncreaseDisabled}
        onPress={handleIncrement}
        textColor={colors.secondary}
        labelStyle={{ marginHorizontal: 0 }}
        style={{
          flex: 0,
          borderColor: isIncreaseDisabled ? undefined : colors.secondary,
          alignSelf: "center",
        }}
      >
        {`+${step}`}
      </Button>
    </View>
  );
};
