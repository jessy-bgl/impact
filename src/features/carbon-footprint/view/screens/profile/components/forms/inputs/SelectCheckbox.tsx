import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { Checkbox, CheckboxItemProps, useTheme } from "react-native-paper";

type Props = Omit<CheckboxItemProps, "label"> & {
  question: Question;
  value: string;
};

export const SelectCheckbox = ({ question, value, ...props }: Props) => {
  const { colors } = useTheme();

  const color = question.isEngineDefaultValueUsed
    ? colors.onSurfaceDisabled
    : undefined;

  return (
    <Checkbox.Item
      style={{ height: 40 }}
      labelVariant="labelLarge"
      label={question.title}
      status={props.status}
      onPress={props.onPress}
      color={color}
    />
  );
};
