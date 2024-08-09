import { DottedName } from "@incubateur-ademe/nosgestesclimat";
import { createContext } from "react";

import { Question } from "@domain/entities/Question";

export const QuestionsContext = createContext<Record<DottedName, Question>>(
  {} as Record<DottedName, Question>,
);
