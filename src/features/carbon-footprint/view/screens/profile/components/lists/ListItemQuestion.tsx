import { Control } from "react-hook-form";
import { ViewStyle } from "react-native";

import { Question } from "@carbonFootprint/domain/entities/question/Question";
import { NumericField } from "@carbonFootprint/view/screens/profile/components/forms/fields/NumericField";
import { NumericFields } from "@carbonFootprint/view/screens/profile/components/forms/fields/NumericFields";
import { SelectBooleanField } from "@carbonFootprint/view/screens/profile/components/forms/fields/SelectBooleanField";
import { SelectField } from "@carbonFootprint/view/screens/profile/components/forms/fields/SelectField";
import { SelectFields } from "@carbonFootprint/view/screens/profile/components/forms/fields/SelectFields";
import { ListItemQuestionDivider } from "@carbonFootprint/view/screens/profile/components/lists/ListItemQuestionDivider";
import { FormValues } from "@carbonFootprint/view/screens/profile/types";

type Props = {
  question: Question;
  control: Control<FormValues, any>;
  handleUpdate: (question: Question, value: string | number) => void;
  divider?: boolean;
  labelFlex?: number;
  inputFlex?: number;
  affix?: string;
  step?: number;
  style?: ViewStyle;
  forceDisplay?: boolean; // NB: correctif pour certaines questions
};

export const ListItemQuestion = ({
  style,
  question,
  control,
  handleUpdate,
  divider = false,
  affix,
  inputFlex,
  labelFlex,
  forceDisplay,
  step,
}: Props) => {
  if (!question.isApplicable && !forceDisplay) return;

  const handleUpdateAsync = (question: Question, value: string | number) =>
    setTimeout(() => handleUpdate(question, value));

  let item = null;

  if (question.type === "number") {
    item = (
      <NumericField
        control={control}
        question={question}
        handleUpdate={handleUpdateAsync}
        affix={affix}
        style={style}
        step={step}
      />
    );
  } else if (question.type === "select") {
    item = (
      <SelectField
        control={control}
        question={question}
        handleUpdate={handleUpdateAsync}
        style={style}
      />
    );
  } else if (question.type === "select-boolean") {
    item = (
      <SelectBooleanField
        control={control}
        question={question}
        handleUpdate={handleUpdateAsync}
        style={style}
        inputFlex={inputFlex}
        labelFlex={labelFlex}
      />
    );
  } else if (question.type === "multi-select") {
    item = (
      <SelectFields
        control={control}
        question={question}
        handleUpdate={handleUpdateAsync}
        style={style}
        inputFlex={inputFlex}
        labelFlex={labelFlex}
      />
    );
  } else if (question.type === "multi-number") {
    item = (
      <NumericFields
        control={control}
        question={question}
        handleUpdate={handleUpdateAsync}
        style={style}
        inputFlex={inputFlex}
        labelFlex={labelFlex}
      />
    );
  }

  return (
    <>
      {divider && (
        <ListItemQuestionDivider
          hidden={!question.isApplicable && !forceDisplay}
        />
      )}
      {item}
    </>
  );
};
