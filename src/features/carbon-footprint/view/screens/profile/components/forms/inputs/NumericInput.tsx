import { View } from "moti";
import { useRef } from "react";
import { TextStyle } from "react-native";
import {
  Button,
  Text,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import {
  clampToRange,
  isDecimalInput,
  normalizeDecimal,
  parseDecimal,
  roundDecimal,
  stripTrailingSeparator,
} from "@carbonFootprint/view/screens/profile/components/forms/inputs/decimalInput";

const MAX_INLINE_UNIT_CHARS = 10;
const MIN_VALUE_WIDTH = 56;
const AFFIX_WIDTH_PER_CHAR = 8;

type Props = TextInputProps & {
  question: Question;
  onValueChange: (value: string) => void;
  positive?: boolean;
  step?: number;
  maxWidth?: number;
  unit?: string;
};

export const NumericInput = ({
  question,
  onValueChange,
  positive = true,
  step = 1,
  maxWidth = 310,
  unit,
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

  const committedValueRef = useRef<string>("");

  const toCommittableValue = (text: string | number | undefined) =>
    clampToRange(stripTrailingSeparator(normalizeDecimal(text)), { min, max });

  const textColor = question.isEngineDefaultValueUsed
    ? colors.onSurfaceDisabled
    : undefined;

  const isUnitInline = !unit || unit.length <= MAX_INLINE_UNIT_CHARS;
  const inlineUnit = isUnitInline ? unit : undefined;
  const externalUnit = isUnitInline ? undefined : unit;
  const inputMinWidth =
    MIN_VALUE_WIDTH +
    (inlineUnit ? inlineUnit.length * AFFIX_WIDTH_PER_CHAR : 0);

  const isDecreaseDisabled =
    min !== undefined && value !== undefined && parseDecimal(value) <= min;
  const isIncreaseDisabled =
    max !== undefined && value !== undefined && parseDecimal(value) >= max;

  const handleIncrement = () => {
    if (props.onChangeText && value !== undefined) {
      const currentValue = parseDecimal(value);
      if (max === undefined || (max !== undefined && currentValue < max)) {
        let newValue = roundDecimal(currentValue + step);
        if (max !== undefined && newValue > max) newValue = max;
        committedValueRef.current = newValue.toString();
        props.onChangeText(committedValueRef.current);
        onValueChange(committedValueRef.current);
      }
    }
  };

  const handleDecrement = () => {
    if (props.onChangeText && value !== undefined) {
      const currentValue = parseDecimal(value);
      if (min === undefined || (min !== undefined && currentValue > min)) {
        let newValue = roundDecimal(currentValue - step);
        if (min !== undefined && newValue < min) newValue = min;
        committedValueRef.current = newValue.toString();
        props.onChangeText(committedValueRef.current);
        onValueChange(committedValueRef.current);
      }
    }
  };

  return (
    <View
      style={{
        ...(props.style as TextStyle),
        gap: 4,
        width: "100%",
        maxWidth: maxWidth,
        alignSelf: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
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
          right={
            inlineUnit && (
              <TextInput.Affix text={inlineUnit} textStyle={{ fontSize: 14 }} />
            )
          }
          inputMode="decimal"
          dense={dense}
          mode={mode}
          selectTextOnFocus={
            props.selectTextOnFocus ?? question.isEngineDefaultValueUsed
          }
          onChangeText={(text) => {
            if (!props.onChangeText) return;
            if (!isDecimalInput(text)) return;
            if (positive && text.includes("-")) return;
            props.onChangeText(text);
          }}
          onFocus={(e) => {
            committedValueRef.current = toCommittableValue(value);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            const committedValue = toCommittableValue(value);

            if (committedValue !== normalizeDecimal(value))
              props.onChangeText?.(committedValue);
            if (committedValue !== committedValueRef.current) {
              committedValueRef.current = committedValue;
              onValueChange(committedValue);
            }
            props.onBlur?.(e);
          }}
          textColor={textColor}
          style={{
            ...(props.style as TextStyle),
            flex: 1,
            minWidth: inputMinWidth,
          }}
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
      {externalUnit && (
        <Text
          variant="bodySmall"
          style={{ alignSelf: "center", color: colors.onSurfaceVariant }}
        >
          {externalUnit}
        </Text>
      )}
    </View>
  );
};
