import { createContext } from "react";

import { EmissionsRepositoryStore } from "../data/store/EmissionsRepositoryStore";
import { EmissionsRepository } from "../domain/repositories/EmissionsRepository";
import { createUseFetchFootprintByCategory } from "../domain/usecases/fetchFootprintByCategory";

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
    useFetchFootprintByCategory: createUseFetchFootprintByCategory(
      repositories.emissionsRepository,
    ),
  };
};

const repositories = initRepositories();

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export type { Repositories };
export { UsecasesContext };
