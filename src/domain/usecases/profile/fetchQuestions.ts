import { ComputeEngine } from "@domain/entities/engine/ComputeEngine";
import { Profile } from "@domain/entities/profile/Profile";

export const createFetchQuestions = (computeEngine: ComputeEngine) => {
  const fetchQuestions = (
    profile: Profile,
    questionLabels: (keyof Profile)[],
  ) => {
    return computeEngine.getQuestions(profile, questionLabels);
  };

  return fetchQuestions;
};
