import { defaultAppStore } from "@common/store/store";
import { useAppStore } from "@common/store/useStore";
import { AppDataRepository } from "@settings/domain/repositories/appData.repository";

export class AppDataStoreRepository implements AppDataRepository {
  constructor(private store: typeof useAppStore) {}

  clearLocalData(): void {
    const { analyticsConsent, shouldShowIntro, theme } = this.store.getState();

    this.store.setState(
      { ...defaultAppStore(), analyticsConsent, shouldShowIntro, theme },
      true,
    );
  }
}
