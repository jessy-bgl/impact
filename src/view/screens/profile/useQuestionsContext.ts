import { QuestionsContext } from "@view/screens/profile/QuestionsContext";
import { useContext } from "react";

export const useQuestionsContext = () => {
  const questions = useContext(QuestionsContext);

  return { questions };
};
