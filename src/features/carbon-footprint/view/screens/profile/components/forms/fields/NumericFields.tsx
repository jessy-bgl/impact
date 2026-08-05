import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { resolveUnitAffix } from "@carbonFootprint/view/screens/profile/components/forms/fields/resolveUnitAffix";
import { NumericInput } from "@carbonFootprint/view/screens/profile/components/forms/inputs/NumericInput";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { RowContainer } from "@carbonFootprint/view/screens/profile/components/RowContainer";
import { useIsWideLayout } from "@carbonFootprint/view/screens/profile/components/useIsWideLayout";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  affix?: string;
  style?: ViewStyle;
  labelFlex?: number;
  inputFlex?: number;
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
      <TextLabel question={question} style={{ flex: labelFlex }} />
      {question.subQuestions
        ?.filter((subQuestion) => !subQuestion.isInactive)
        .map((subQuestion) => {
          const resolvedAffix = affix ?? resolveUnitAffix(t, subQuestion.unit);
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
                    right={
                      resolvedAffix && <TextInput.Affix text={resolvedAffix} />
                    }
                    onValueChange={(value: string) => {
                      handleUpdate(subQuestion, Number(value));
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
