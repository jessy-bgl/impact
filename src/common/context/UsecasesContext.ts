import { createContext } from "react";

import { ActionsInMemoryRepository } from "@carbonFootprint/data/repositories/actions.memory.repository";
import { ActionsStoreRepository } from "@carbonFootprint/data/repositories/actions.store.repository";
import { FootprintsStoreRepository } from "@carbonFootprint/data/repositories/footprints.store.repository";
import { IntroStoreRepository } from "@carbonFootprint/data/repositories/intro.store.repository";
import { ProfileStoreRepository } from "@carbonFootprint/data/repositories/profile.store.repository";
import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { ActionsRepository } from "@carbonFootprint/domain/repositories/actions.repository";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { IntroRepository } from "@carbonFootprint/domain/repositories/intro.repository";
import { ProfileRepository } from "@carbonFootprint/domain/repositories/profile.repository";
import { createSyncEngineWithStoredActions } from "@carbonFootprint/domain/usecases/actions/syncEngineWithStoredActions";
import { createUpdateActionState } from "@carbonFootprint/domain/usecases/actions/updateActionState";
import { createComputeAnnualFootprint } from "@carbonFootprint/domain/usecases/footprints/computeAnnualFootprint";
import { createUpdateFootprint } from "@carbonFootprint/domain/usecases/footprints/updateFootprint";
import { createUpdateShowIntro } from "@carbonFootprint/domain/usecases/intro/updateShowIntro";
import { createFetchQuestions } from "@carbonFootprint/domain/usecases/profile/fetchQuestions";
import { createSyncFootprintsProfileWithEngine } from "@carbonFootprint/domain/usecases/profile/syncFootprintsProfileWithEngine";
import { createUpdateProfile } from "@carbonFootprint/domain/usecases/profile/updateProfile";
import { isTestMode } from "@common/constants";
import { useAppStore } from "@common/store/useStore";
import { SettingsStoreRepository } from "@settings/data/repositories/settings.store.repository";
import { SettingsRepository } from "@settings/domain/repositories/settings.repository";
import { createSetTheme } from "@settings/domain/usecases/setTheme";

export interface Repositories {
  computeEngine: ComputeEngine;
  profileRepository: ProfileRepository;
  footprintsRepository: FootprintsRepository;
  actionsRepository: ActionsRepository;
  introRepository: IntroRepository;
  settingsRepository: SettingsRepository;
}

const initRealRepositories = () => ({
  computeEngine: new AdemeComputeEngine(),
  profileRepository: new ProfileStoreRepository(useAppStore),
  footprintsRepository: new FootprintsStoreRepository(useAppStore),
  actionsRepository: new ActionsStoreRepository(useAppStore),
  introRepository: new IntroStoreRepository(useAppStore),
  settingsRepository: new SettingsStoreRepository(useAppStore),
});

export const initFakeRepositories = () => ({
  computeEngine: new AdemeComputeEngine(),
  profileRepository: new ProfileStoreRepository(useAppStore),
  footprintsRepository: new FootprintsStoreRepository(useAppStore),
  actionsRepository: new ActionsInMemoryRepository(),
  introRepository: new IntroStoreRepository(useAppStore),
  settingsRepository: new SettingsStoreRepository(useAppStore),
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
    introRepository,
    settingsRepository,
  } = repositories;

  return {
    ...createUpdateActionState(actionsRepository),
    ...createSyncEngineWithStoredActions(computeEngine, actionsRepository),
    ...createFetchQuestions(computeEngine),
    ...createSyncFootprintsProfileWithEngine(
      computeEngine,
      profileRepository,
      footprintsRepository,
    ),
    ...createUpdateProfile(
      computeEngine,
      profileRepository,
      footprintsRepository,
    ),
    ...createComputeAnnualFootprint(),
    ...createUpdateFootprint(footprintsRepository),
    ...createUpdateShowIntro(introRepository),
    ...createSetTheme(settingsRepository),
  };
};

const usecases = initUsecases(repositories);

export const UsecasesContext = createContext(usecases);
