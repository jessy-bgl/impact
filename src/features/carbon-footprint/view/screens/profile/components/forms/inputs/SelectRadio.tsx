import { View } from "react-native";
import {
  RadioButton,
  RadioButtonGroupProps,
  RadioButtonProps,
  Text,
  useTheme,
} from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";

type Props = RadioButtonProps &
  Omit<RadioButtonGroupProps, "children"> & {
    question: Question;
  };

export const SelectRadio = ({ question, value, onValueChange }: Props) => {
  const { colors } = useTheme();

  const color = question.isEngineDefaultValueUsed
    ? colors.onSurfaceDisabled
    : undefined;

  if (!question.options) return;

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      {question.options.map((option) => {
        return (
          <View
            key={option.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ flex: 1 }}>{option.label}</Text>
            <RadioButton value={option.value} color={color} />
          </View>
        );
      })}
    </RadioButton.Group>
  );
};
