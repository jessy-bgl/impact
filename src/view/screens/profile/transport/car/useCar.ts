import { useContext } from "react";
import { DefaultValues, useForm } from "react-hook-form";

import { UsecasesContext } from "@common/UsecasesContext";
import { AdemeFootprintEngine } from "@domain/entities/AdemeFootprintEngine";
import { Question } from "@domain/entities/Question";
import { useQuestionsContext } from "@view/screens/profile/useQuestionsContext";
import { FormValues } from "@view/screens/profile/utils/types";

export const useCar = () => {
  const { questions } = useQuestionsContext();
  const { updateTransportProfile } = useContext(UsecasesContext);

  const kmPerYearQuestion = questions["transport . voiture . km"];
  const averagePassengersQuestion =
    questions["transport . voiture . voyageurs"];
  const regularUsageOfSameCarQuestion =
    questions["transport . voiture . utilisateur"];

  const q = AdemeFootprintEngine.getQuestionRules();
  const tmp = Object.values(q).filter(
    (rule) =>
      rule.rawNode["applicable si"] &&
      (rule.explanation.valeur.sourceMap?.args["applicable si"] as any)
        .nodeKind === "operation",
  );
  // .map((rule) => rule.rawNode["applicable si"]);
  console.log(tmp);

  const getDefaultValues = (): DefaultValues<FormValues> => ({
    [kmPerYearQuestion.label]: kmPerYearQuestion.defaultValue,
    [averagePassengersQuestion.label]: averagePassengersQuestion.defaultValue,
    [regularUsageOfSameCarQuestion.label]:
      regularUsageOfSameCarQuestion.defaultValue,
    // regularUser: storedCar.regularUser.toString(),
    // size: storedCar.size.toString(),
    // engine: storedCar.engine.toString(),
    // fuelType: storedCar.fuelType.toString(),
    // age: storedCar.age.toString(),
    // averagePassengers: storedCar.averagePassengers.toString(),
    // averageFuelConsumption: storedCar.averageFuelConsumption.toString(),
  });

  const { control, watch, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues(),
  });

  const handleUpdateTransportProfile = (question: Question, value: string) => {
    updateTransportProfile(
      question,
      value || question.minValue?.toString() || "0",
    );
  };

  // useEffect(() => {
  //   if (!storedRegularUser) reset(getDefaultValues());
  // }, [storedRegularUser]);

  // const regularUser = watch("regularUser") === "true";

  return {
    control,
    handleUpdateTransportProfile,
    kmPerYearQuestion,
    averagePassengersQuestion,
    regularUsageOfSameCarQuestion,
  };
};
