import { createContext } from "react";

import { EmissionsRepositoryStore } from "../data/repositories/EmissionsRepositoryStore";
import { EmissionsRepository } from "../domain/repositories/EmissionsRepository";
import { createUseFetchFootprints } from "../domain/usecases/fetchFootprints";

interface Repositories {
  emissionsRepository: EmissionsRepository;
}

const initRepositories = (): Repositories => {
  return {
    emissionsRepository: new EmissionsRepositoryStore(),
  };
};

const initUsecases = (repositories: Repositories) => {
  return {
    useFetchFootprints: createUseFetchFootprints(
      repositories.emissionsRepository,
    ),
  };
};

const repositories = initRepositories();

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export type { Repositories };
export { UsecasesContext };
