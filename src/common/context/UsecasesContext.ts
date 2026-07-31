import { createContext } from "react";

import { ActionsStoreRepository } from "@carbonFootprint/data/repositories/actions.store.repository";
import { ActionsStubRepository } from "@carbonFootprint/data/repositories/actions.stub.repository";
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
import { ConsentStoreRepository } from "@consent/data/repositories/consent.store.repository";
import { ConsentStubRepository } from "@consent/data/repositories/consent.stub.repository";
import { ConsentRepository } from "@consent/domain/repositories/consent.repository";
import { createGrantAnalyticsConsent } from "@consent/domain/usecases/grantAnalyticsConsent";
import { createRevokeAnalyticsConsent } from "@consent/domain/usecases/revokeAnalyticsConsent";
import { AppDataStoreRepository } from "@settings/data/repositories/appData.store.repository";
import { SettingsStoreRepository } from "@settings/data/repositories/settings.store.repository";
import { AppDataRepository } from "@settings/domain/repositories/appData.repository";
import { SettingsRepository } from "@settings/domain/repositories/settings.repository";
import { createClearLocalData } from "@settings/domain/usecases/clearLocalData";
import { createSetTheme } from "@settings/domain/usecases/setTheme";

export interface Repositories {
  computeEngine: ComputeEngine;
  profileRepository: ProfileRepository;
  footprintsRepository: FootprintsRepository;
  actionsRepository: ActionsRepository;
  introRepository: IntroRepository;
  settingsRepository: SettingsRepository;
  consentRepository: ConsentRepository;
  appDataRepository: AppDataRepository;
}

const initRealRepositories = () => ({
  computeEngine: new AdemeComputeEngine(),
  profileRepository: new ProfileStoreRepository(useAppStore),
  footprintsRepository: new FootprintsStoreRepository(useAppStore),
  actionsRepository: new ActionsStoreRepository(useAppStore),
  introRepository: new IntroStoreRepository(useAppStore),
  settingsRepository: new SettingsStoreRepository(useAppStore),
  consentRepository: new ConsentStoreRepository(useAppStore),
  appDataRepository: new AppDataStoreRepository(useAppStore),
});

export const initFakeRepositories = () => ({
  computeEngine: new AdemeComputeEngine(),
  profileRepository: new ProfileStoreRepository(useAppStore),
  footprintsRepository: new FootprintsStoreRepository(useAppStore),
  actionsRepository: new ActionsStubRepository(),
  introRepository: new IntroStoreRepository(useAppStore),
  settingsRepository: new SettingsStoreRepository(useAppStore),
  consentRepository: new ConsentStubRepository(),
  appDataRepository: new AppDataStoreRepository(useAppStore),
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
    consentRepository,
    appDataRepository,
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
    ...createGrantAnalyticsConsent(consentRepository),
    ...createRevokeAnalyticsConsent(consentRepository),
    ...createClearLocalData(appDataRepository),
  };
};

const usecases = initUsecases(repositories);

export const UsecasesContext = createContext(usecases);
