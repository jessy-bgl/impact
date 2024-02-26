import { createContext } from "react";

import { ActionsInMemoryRepository } from "@data/repositories/actions.memory.repository";
import { ActionsStoreRepository } from "@data/repositories/actions.store.repository";
import { EmissionsInMemoryRepository } from "@data/repositories/emissions.memory.repository";
import { EmissionsStoreRepository } from "@data/repositories/emissions.store.repository";
import { ActionsRepository } from "@domain/repositories/actions.repository";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";
import { createUseUpdateActions } from "@domain/usecases/actions/updateActions";
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
  actionsRepository: ActionsRepository;
}

const initRealRepositories = () => ({
  emissionsRepository: new EmissionsStoreRepository(),
  actionsRepository: new ActionsStoreRepository(),
});

export const initFakeRepositories = () => ({
  emissionsRepository: new EmissionsInMemoryRepository(),
  actionsRepository: new ActionsInMemoryRepository(),
});

const repositories: Repositories = isTestMode
  ? initFakeRepositories()
  : initRealRepositories();

const initUsecases = (repositories: Repositories) => {
  const { emissionsRepository, actionsRepository } = repositories;

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

    useUpdateActions: createUseUpdateActions(
      actionsRepository,
      emissionsRepository,
    ),
  };
};

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export { UsecasesContext };
export type { Repositories };
