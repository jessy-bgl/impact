import { createContext } from "react";

import { ActionsInMemoryRepository } from "@data/repositories/actions.memory.repository";
import { ActionsStoreRepository } from "@data/repositories/actions.store.repository";
import { EmissionsInMemoryRepository } from "@data/repositories/emissions.memory.repository";
import { EmissionsStoreRepository } from "@data/repositories/emissions.store.repository";
import { FootprintsStoreRepository } from "@data/repositories/footprints.store.repository";
import { ProfileStoreRepository } from "@data/repositories/profile.store.repository";
import { ActionsRepository } from "@domain/repositories/actions.repository";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";
import { ProfileRepository } from "@domain/repositories/profile.repository";
import { createUpdateActionState } from "@domain/usecases/actions/updateActionState";
import { createUpdateActions } from "@domain/usecases/actions/updateActions";
import { createComputeAnnualFootprint } from "@domain/usecases/footprints/computeAnnualFootprint";
import { createFetchTransportFootprint } from "@domain/usecases/footprints/fetchTransportFootprint";
import { createUpdateTransportFootprint } from "@domain/usecases/footprints/updateTransportFootprint";
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
import { createFetchProfile } from "@domain/usecases/profile/fetchProfile";
import { createUpdateProfile } from "@domain/usecases/profile/updateProfile";

const isTestMode = process.env.NODE_ENV === "test";

interface Repositories {
  profileRepository: ProfileRepository;
  footprintsRepository: FootprintsRepository;
  emissionsRepository: EmissionsRepository;
  actionsRepository: ActionsRepository;
}

const initRealRepositories = () => ({
  profileRepository: new ProfileStoreRepository(),
  footprintsRepository: new FootprintsStoreRepository(),
  emissionsRepository: new EmissionsStoreRepository(),
  actionsRepository: new ActionsStoreRepository(),
});

export const initFakeRepositories = () => ({
  profileRepository: new ProfileStoreRepository(), // TODO
  footprintsRepository: new FootprintsStoreRepository(), // TODO
  emissionsRepository: new EmissionsInMemoryRepository(),
  actionsRepository: new ActionsInMemoryRepository(),
});

const repositories: Repositories = isTestMode
  ? initFakeRepositories()
  : initRealRepositories();

const initUsecases = (repositories: Repositories) => {
  const {
    profileRepository,
    emissionsRepository,
    actionsRepository,
    footprintsRepository,
  } = repositories;

  const { updateTransportProfile } = createUpdateProfile(
    profileRepository,
    footprintsRepository,
  );

  return {
    fetchTransportFootprint:
      createFetchTransportFootprint(footprintsRepository),
    updateTransportFootprint:
      createUpdateTransportFootprint(footprintsRepository),
    fetchProfile: createFetchProfile(profileRepository),
    updateTransportProfile,
    computeAnnualFootprint: createComputeAnnualFootprint(footprintsRepository),

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

    updateActionState: createUpdateActionState(actionsRepository),
    updateActions: createUpdateActions(actionsRepository, emissionsRepository),
  };
};

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export { UsecasesContext };
export type { Repositories };
