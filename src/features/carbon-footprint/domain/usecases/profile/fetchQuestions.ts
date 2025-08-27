import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

export const createFetchQuestions = (computeEngine: ComputeEngine) => {
  const fetchQuestions = (
    profile: Profile,
    questionLabels: (keyof Profile)[],
  ) => {
    return computeEngine.getQuestions(profile, questionLabels);
  };

  return fetchQuestions;
};
