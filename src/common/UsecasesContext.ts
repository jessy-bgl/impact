import { createContext } from "react";

import { ActionsInMemoryRepository } from "@data/repositories/actions.memory.repository";
import { ActionsStoreRepository } from "@data/repositories/actions.store.repository";
import { FootprintsStoreRepository } from "@data/repositories/footprints.store.repository";
import { ProfileStoreRepository } from "@data/repositories/profile.store.repository";
import { ActionsRepository } from "@domain/repositories/actions.repository";
import { FootprintsRepository } from "@domain/repositories/footprints.repository";
import { ProfileRepository } from "@domain/repositories/profile.repository";
import { createSyncEngineWithStoredActions } from "@domain/usecases/actions/syncEngineWithStoredActions";
import { createUpdateActionState } from "@domain/usecases/actions/updateActionState";
import { createComputeAnnualFootprint } from "@domain/usecases/footprints/computeAnnualFootprint";
import { createFetchEverydayThingsFootprint } from "@domain/usecases/footprints/fetchEverydayThingsFootprint";
import { createFetchFoodFootprint } from "@domain/usecases/footprints/fetchFoodFootprint";
import { createFetchHousingFootprint } from "@domain/usecases/footprints/fetchHousingFootprint";
import { createFetchSocietalServicesFootprint } from "@domain/usecases/footprints/fetchSocietalServicesFootprint";
import { createFetchTransportFootprint } from "@domain/usecases/footprints/fetchTransportFootprint";
import { createUpdateEverydayThingsFootprint } from "@domain/usecases/footprints/updateEverydayThingsFootprint";
import { createUpdateFoodFootprint } from "@domain/usecases/footprints/updateFoodFootprint";
import { createUpdateHousingFootprint } from "@domain/usecases/footprints/updateHousingFootprint";
import { createUpdateTransportFootprint } from "@domain/usecases/footprints/updateTransportFootprint";
import { createSyncStoredProfileWithEngine } from "@domain/usecases/profile/syncStoredProfileWithEngine";
import { createUpdateProfile } from "@domain/usecases/profile/updateProfile";

const isTestMode = process.env.NODE_ENV === "test";

interface Repositories {
  profileRepository: ProfileRepository;
  footprintsRepository: FootprintsRepository;
  actionsRepository: ActionsRepository;
}

const initRealRepositories = () => ({
  profileRepository: new ProfileStoreRepository(),
  footprintsRepository: new FootprintsStoreRepository(),
  actionsRepository: new ActionsStoreRepository(),
});

export const initFakeRepositories = () => ({
  profileRepository: new ProfileStoreRepository(),
  footprintsRepository: new FootprintsStoreRepository(),
  actionsRepository: new ActionsInMemoryRepository(),
});

const repositories: Repositories = isTestMode
  ? initFakeRepositories()
  : initRealRepositories();

const initUsecases = (repositories: Repositories) => {
  const { profileRepository, footprintsRepository, actionsRepository } =
    repositories;

  const {
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
  } = createUpdateProfile(profileRepository, footprintsRepository);

  return {
    updateActionState: createUpdateActionState(actionsRepository),
    syncEngineWithStoredActions:
      createSyncEngineWithStoredActions(actionsRepository),

    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    syncStoredProfileWithEngine:
      createSyncStoredProfileWithEngine(profileRepository),

    fetchTransportFootprint:
      createFetchTransportFootprint(footprintsRepository),
    updateTransportFootprint:
      createUpdateTransportFootprint(footprintsRepository),

    fetchFoodFootprint: createFetchFoodFootprint(footprintsRepository),
    updateFoodFootprint: createUpdateFoodFootprint(footprintsRepository),

    fetchHousingFootprint: createFetchHousingFootprint(footprintsRepository),
    updateHousingFootprint: createUpdateHousingFootprint(footprintsRepository),

    fetchEverydayThingsFootprint:
      createFetchEverydayThingsFootprint(footprintsRepository),
    updateEverydayThingsFootprint:
      createUpdateEverydayThingsFootprint(footprintsRepository),

    fetchSocietalServicesFootprint:
      createFetchSocietalServicesFootprint(footprintsRepository),

    computeAnnualFootprint: createComputeAnnualFootprint(footprintsRepository),
  };
};

const usecases = initUsecases(repositories);

const UsecasesContext = createContext(usecases);

export { UsecasesContext };
export type { Repositories };
