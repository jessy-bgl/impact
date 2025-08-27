import { createContext } from "react";

import { ActionsInMemoryRepository } from "@carbonFootprint/data/repositories/actions.memory.repository";
import { ActionsStoreRepository } from "@carbonFootprint/data/repositories/actions.store.repository";
import { FootprintsStoreRepository } from "@carbonFootprint/data/repositories/footprints.store.repository";
import { ProfileStoreRepository } from "@carbonFootprint/data/repositories/profile.store.repository";
import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";
import { createSyncEngineWithStoredActions } from "@carbonFootprint/domain/usecases/actions/syncEngineWithStoredActions";
import { createUpdateActionState } from "@carbonFootprint/domain/usecases/actions/updateActionState";
import { createComputeAnnualFootprint } from "@carbonFootprint/domain/usecases/footprints/computeAnnualFootprint";
import { createFetchEverydayThingsFootprint } from "@carbonFootprint/domain/usecases/footprints/fetchEverydayThingsFootprint";
import { createFetchFoodFootprint } from "@carbonFootprint/domain/usecases/footprints/fetchFoodFootprint";
import { createFetchHousingFootprint } from "@carbonFootprint/domain/usecases/footprints/fetchHousingFootprint";
import { createFetchSocietalServicesFootprint } from "@carbonFootprint/domain/usecases/footprints/fetchSocietalServicesFootprint";
import { createFetchTransportFootprint } from "@carbonFootprint/domain/usecases/footprints/fetchTransportFootprint";
import { createUpdateEverydayThingsFootprint } from "@carbonFootprint/domain/usecases/footprints/updateEverydayThingsFootprint";
import { createUpdateFoodFootprint } from "@carbonFootprint/domain/usecases/footprints/updateFoodFootprint";
import { createUpdateHousingFootprint } from "@carbonFootprint/domain/usecases/footprints/updateHousingFootprint";
import { createUpdateTransportFootprint } from "@carbonFootprint/domain/usecases/footprints/updateTransportFootprint";
import { createFetchQuestions } from "@carbonFootprint/domain/usecases/profile/fetchQuestions";
import { createSyncFootprintsProfileWithEngine } from "@carbonFootprint/domain/usecases/profile/syncFootprintsProfileWithEngine";
import { createUpdateProfile } from "@carbonFootprint/domain/usecases/profile/updateProfile";
import { isTestMode } from "@common/constants";

export interface Repositories {
  computeEngine: ComputeEngine;
  profileRepository: ProfileRepository;
  footprintsRepository: FootprintsRepository;
  actionsRepository: ActionsRepository;
}

const initRealRepositories = () => ({
  computeEngine: new AdemeComputeEngine(),
  profileRepository: new ProfileStoreRepository(),
  footprintsRepository: new FootprintsStoreRepository(),
  actionsRepository: new ActionsStoreRepository(),
});

export const initFakeRepositories = () => ({
  computeEngine: new AdemeComputeEngine(),
  profileRepository: new ProfileStoreRepository(),
  footprintsRepository: new FootprintsStoreRepository(),
  actionsRepository: new ActionsInMemoryRepository(),
});

const repositories: Repositories = isTestMode
  ? initFakeRepositories()
  : initRealRepositories();

const initUsecases = (repositories: Repositories) => {
  const {
    computeEngine,
    profileRepository,
    footprintsRepository,
    actionsRepository,
  } = repositories;

  const {
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    updateProfileCompletion,
  } = createUpdateProfile(
    computeEngine,
    profileRepository,
    footprintsRepository,
  );

  return {
    updateActionState: createUpdateActionState(actionsRepository),
    syncEngineWithStoredActions: createSyncEngineWithStoredActions(
      computeEngine,
      actionsRepository,
    ),

    fetchQuestions: createFetchQuestions(computeEngine),
    updateTransportProfile,
    updateFoodProfile,
    updateHousingProfile,
    updateEverydayThingsProfile,
    updateProfileCompletion,
    syncFootprintsProfileWithEngine: createSyncFootprintsProfileWithEngine(
      computeEngine,
      profileRepository,
      footprintsRepository,
    ),

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

export const UsecasesContext = createContext(usecases);
