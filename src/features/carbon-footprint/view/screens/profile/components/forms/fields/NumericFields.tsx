import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ViewStyle } from "react-native";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { resolveUnitAffix } from "@carbonFootprint/view/screens/profile/components/forms/fields/resolveUnitAffix";
import { parseDecimal } from "@carbonFootprint/view/screens/profile/components/forms/inputs/decimalInput";
import { NumericInput } from "@carbonFootprint/view/screens/profile/components/forms/inputs/NumericInput";
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

export const NumericFields = ({
  question,
  control,
  style,
  handleUpdate,
}: Props) => {
  const { t } = useTranslation("common");
  const isWideLayout = useIsWideLayout();

  const ContainerView = isWideLayout ? RowContainer : ColumnContainer;

  return (
    <ColumnContainer style={style}>
      <TextLabel question={question} />
      {question.subQuestions
        ?.filter((subQuestion) => !subQuestion.isInactive)
        .map((subQuestion) => {
          const unit = resolveUnitAffix(t, subQuestion.unit);
          return (
            <ContainerView key={subQuestion.label}>
              <TextLabel
                question={subQuestion}
                style={isWideLayout ? { flex: 1 } : {}}
              />
              <Controller<FormValues>
                name={subQuestion.label}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericInput
                    question={subQuestion}
                    unit={unit}
                    onValueChange={(value: string) => {
                      handleUpdate(subQuestion, parseDecimal(value));
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </ContainerView>
          );
        })}
    </ColumnContainer>
  );
};
