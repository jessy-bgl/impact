import { createContext } from "react";

import { ActionsInMemoryRepository } from "@data/repositories/actions.memory.repository";
import { ActionsStoreRepository } from "@data/repositories/actions.store.repository";
import { FootprintsStoreRepository } from "@data/repositories/footprints.store.repository";
import { ProfileStoreRepository } from "@data/repositories/profile.store.repository";
import { AdemeComputeEngine } from "@domain/entities/engine/AdemeComputeEngine";
import { ComputeEngine } from "@domain/entities/engine/ComputeEngine";
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
import { createFetchQuestions } from "@domain/usecases/profile/fetchQuestions";
import { createSyncFootprintsProfileWithEngine } from "@domain/usecases/profile/syncFootprintsProfileWithEngine";
import { createUpdateProfile } from "@domain/usecases/profile/updateProfile";
import { isTestMode } from "../constants";

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
