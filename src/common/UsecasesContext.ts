import { createContext } from "react";

import { EmissionsRepositoryStore } from "../data/repositories/EmissionsRepositoryStore";
import { EmissionsRepository } from "../domain/repositories/EmissionsRepository";
import { createUseComputeTotalAnnualFootprint } from "../domain/usecases/computeTotalAnnualFootprint";
import { createUseFetchTransport } from "../domain/usecases/fetchTransport";
import { createUseUpdateTransport } from "../domain/usecases/updateTransport";

interface Repositories {
  emissionsRepository: EmissionsRepository;
}

const initRepositories = (): Repositories => {
  return {
    emissionsRepository: new EmissionsRepositoryStore(),
  };
};

const initUsecases = (repositories: Repositories) => {
  const { emissionsRepository } = repositories;

  return {
    useFetchTransport: createUseFetchTransport(emissionsRepository),
    useUpdateTransport: createUseUpdateTransport(emissionsRepository),
    useComputeTotalAnnualFootprint:
      createUseComputeTotalAnnualFootprint(emissionsRepository),
  };
};

const repositories = initRepositories();

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export type { Repositories };
export { UsecasesContext };
