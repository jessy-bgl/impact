import { Control, Controller } from "react-hook-form";
import { ViewStyle } from "react-native";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { SelectSegmented } from "@carbonFootprint/view/screens/profile/components/forms/inputs/SelectSegmented";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { RowContainer } from "@carbonFootprint/view/screens/profile/components/RowContainer";
import { useIsWideLayout } from "@carbonFootprint/view/screens/profile/components/useIsWideLayout";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  style?: ViewStyle;
};

export const SelectBooleanField = ({
  question,
  control,
  style,
  handleUpdate,
}: Props) => {
  const isWideLayout = useIsWideLayout();

  const ContainerView = isWideLayout ? RowContainer : ColumnContainer;

  return (
    <ContainerView style={style}>
      <TextLabel question={question} style={isWideLayout ? { flex: 1 } : {}} />
      <Controller<FormValues>
        name={question.label}
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectSegmented
            question={question}
            style={isWideLayout ? { flex: 1 } : {}}
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
