import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ViewStyle } from "react-native";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { resolveUnitAffix } from "@carbonFootprint/view/screens/profile/components/forms/fields/resolveUnitAffix";
import { parseDecimal } from "@carbonFootprint/view/screens/profile/components/forms/inputs/decimalInput";
import { NumericInput } from "@carbonFootprint/view/screens/profile/components/forms/inputs/NumericInput";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  style?: ViewStyle;
  step?: number;
};

export const NumericField = ({
  question,
  control,
  style,
  step,
  handleUpdate,
}: Props) => {
  const { t } = useTranslation("common");
  const unit = resolveUnitAffix(t, question.unit);

  return (
    <ColumnContainer style={style}>
      <TextLabel question={question} />
      <Controller<FormValues>
        name={question.label}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <NumericInput
              question={question}
              unit={unit}
              onValueChange={(value: string) =>
                handleUpdate(question, parseDecimal(value))
              }
              onChangeText={onChange}
              value={value}
              step={step}
            />
          );
        }}
      />
    </ColumnContainer>
  );
};
