import { Control, Controller } from "react-hook-form";
import { useWindowDimensions, ViewStyle } from "react-native";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { SelectSegmented } from "@carbonFootprint/view/screens/profile/components/forms/inputs/SelectSegmented";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { RowContainer } from "@carbonFootprint/view/screens/profile/components/RowContainer";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  style?: ViewStyle;
  labelFlex?: number;
  inputFlex?: number;
};

export const SelectBooleanField = ({
  question,
  control,
  style,
  handleUpdate,
  inputFlex,
  labelFlex,
}: Props) => {
  const { width } = useWindowDimensions();
  const widthLimit = 500;
  const isWidthLimitReached = width > widthLimit;

  const ContainerView = isWidthLimitReached ? RowContainer : ColumnContainer;

  return (
    <ContainerView style={style}>
      <TextLabel question={question} style={{ flex: labelFlex }} />
      <Controller<FormValues>
        name={question.label}
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectSegmented
            question={question}
            style={isWidthLimitReached ? { flex: inputFlex } : {}}
            options={question.options!}
            value={value}
            onValueChange={(newValue: string) => {
              onChange(newValue);
              handleUpdate(question, newValue);
            }}
          />
        )}
      />
    </ContainerView>
  );
};
