import { ThemeMode } from "@common/store/store";
import { useAppStore } from "@common/store/useStore";
import { SettingsRepository } from "@settings/domain/repositories/settings.repository";

export class SettingsStoreRepository implements SettingsRepository {
  constructor(private store: typeof useAppStore) {}

  getTheme(): ThemeMode {
    return this.store.getState().theme;
  }

  setTheme(theme: ThemeMode): void {
    this.store.setState((state) => ({
      ...state,
      theme,
    }));
  }
}
