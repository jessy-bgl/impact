import { createContext } from "react";

import { EmissionsInMemoryRepository } from "@data/repositories/emissions.memory.repository";
import { EmissionsStoreRepository } from "@data/repositories/emissions.store.repository";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";
import { createUseComputeTotalAnnualFootprint } from "@domain/usecases/profil/computeTotalAnnualFootprint";
import { createUseFetchEverydayThings } from "@domain/usecases/profil/fetchEverydayThings";
import { createUseFetchFood } from "@domain/usecases/profil/fetchFood";
import { createUseFetchHousing } from "@domain/usecases/profil/fetchHousing";
import { createUseFetchPublicServices } from "@domain/usecases/profil/fetchPublicServices";
import { createUseFetchTransport } from "@domain/usecases/profil/fetchTransport";
import { createUseUpdateEverydayThings } from "@domain/usecases/profil/updateEverydayThings";
import { createUseUpdateFood } from "@domain/usecases/profil/updateFood";
import { createUseUpdateHousing } from "@domain/usecases/profil/updateHousing";
import { createUseUpdateTransport } from "@domain/usecases/profil/updateTransport";

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
    useFetchHousing: createUseFetchHousing(emissionsRepository),
    useUpdateHousing: createUseUpdateHousing(emissionsRepository),
    useFetchEverydayThings: createUseFetchEverydayThings(emissionsRepository),
    useUpdateEverydayThings: createUseUpdateEverydayThings(emissionsRepository),
    useFetchPublicServices: createUseFetchPublicServices(emissionsRepository),
    useComputeTotalAnnualFootprint:
      createUseComputeTotalAnnualFootprint(emissionsRepository),
  };
};

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export { UsecasesContext };
export type { Repositories };
