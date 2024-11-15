// TODO : supprimer ce fichier
import { DottedName } from "@incubateur-ademe/nosgestesclimat";
import { createContext, useContext } from "react";

import { Question } from "@domain/entities/question/Question";

export const QuestionsContext = createContext<Record<DottedName, Question>>(
  {} as Record<DottedName, Question>,
);

export const useQuestionsContext = () => {
  const questions = useContext(QuestionsContext);
  return { questions };
};
