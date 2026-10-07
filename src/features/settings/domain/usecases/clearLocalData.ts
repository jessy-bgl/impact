import { AppDataRepository } from "@settings/domain/repositories/appData.repository";

export const createClearLocalData = (
  repository: AppDataRepository,
  syncFootprintsProfileWithEngine: () => Promise<void>,
) => {
  const clearLocalData = (): Promise<void> => {
    repository.clearLocalData();
    // The engine still holds the erased profile: the actions stay empty until
    // it is given the cleared one.
    return syncFootprintsProfileWithEngine();
  };

  return { clearLocalData };
};
