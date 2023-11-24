import { createContext } from "react";

import { EmissionsInMemoryRepository } from "../data/repositories/EmissionsInMemoryRepository";
import { EmissionsStoreRepository } from "../data/repositories/EmissionsStoreRepository";
import { EmissionsRepository } from "../domain/repositories/EmissionsRepository";
import { createUseComputeTotalAnnualFootprint } from "../domain/usecases/computeTotalAnnualFootprint";
import { createUseFetchFood } from "../domain/usecases/fetchFood";
import { createUseFetchPublicServices } from "../domain/usecases/fetchPublicServices";
import { createUseFetchTransport } from "../domain/usecases/fetchTransport";
import { createUseUpdateFood } from "../domain/usecases/updateFood";
import { createUseUpdateTransport } from "../domain/usecases/updateTransport";

const isTestMode = process.env.NODE_ENV === "test";

interface Repositories {
  emissionsRepository: EmissionsRepository;
}

const initRealRepositories = () => ({
  emissionsRepository: new EmissionsStoreRepository(),
});

export const initFakeRepositories = () => ({
  emissionsRepository: new EmissionsInMemoryRepository(),
});

const repositories: Repositories = isTestMode
  ? initFakeRepositories()
  : initRealRepositories();

const initUsecases = (repositories: Repositories) => {
  const { emissionsRepository } = repositories;

  return {
    useFetchTransport: createUseFetchTransport(emissionsRepository),
    useUpdateTransport: createUseUpdateTransport(emissionsRepository),
    useFetchFood: createUseFetchFood(emissionsRepository),
    useUpdateFood: createUseUpdateFood(emissionsRepository),
    useComputeTotalAnnualFootprint:
      createUseComputeTotalAnnualFootprint(emissionsRepository),
    useFetchPublicServices: createUseFetchPublicServices(emissionsRepository),
  };
};

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export type { Repositories };
export { UsecasesContext };
