import { Control, Controller } from "react-hook-form";
import { useWindowDimensions, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { ColumnContainer } from "@carbonFootprint/view/screens/profile/components/ColumnContainer";
import { NumericInput } from "@carbonFootprint/view/screens/profile/components/forms/inputs/NumericInput";
import { TextLabel } from "@carbonFootprint/view/screens/profile/components/forms/TextLabel";
import { RowContainer } from "@carbonFootprint/view/screens/profile/components/RowContainer";
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
  affix,
  handleUpdate,
  labelFlex,
  inputFlex,
}: Props) => {
  const { width } = useWindowDimensions();
  const widthLimit = 450;
  const isWidthLimitReached = width > widthLimit;

  const ContainerView = isWidthLimitReached ? RowContainer : ColumnContainer;

  return (
    <ColumnContainer style={style}>
      <TextLabel question={question} style={{ flex: labelFlex }} />
      {question.subQuestions
        ?.filter((subQuestion) => !subQuestion.isInactive)
        .map((subQuestion) => (
          <ContainerView key={subQuestion.label}>
            <TextLabel
              question={subQuestion}
              style={isWidthLimitReached ? { flex: labelFlex ?? 1 } : {}}
            />
            <Controller<FormValues>
              name={subQuestion.label}
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumericInput
                  question={subQuestion}
                  right={affix && <TextInput.Affix text={affix} />}
                  onValueChange={(value: string) => {
                    handleUpdate(subQuestion, Number(value));
                  }}
                  onChangeText={onChange}
                  value={value}
                  maxWidth={250}
                  style={
                    isWidthLimitReached
                      ? { flex: inputFlex ?? 2, textAlign: "center" }
                      : { textAlign: "center" }
                  }
                />
              )}
            />
          </ContainerView>
        ))}
    </ColumnContainer>
  );
};
