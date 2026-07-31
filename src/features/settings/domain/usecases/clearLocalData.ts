import { AppDataRepository } from "@settings/domain/repositories/appData.repository";

export const createClearLocalData = (repository: AppDataRepository) => {
  const clearLocalData = () => {
    repository.clearLocalData();
  };

  return { clearLocalData };
};
