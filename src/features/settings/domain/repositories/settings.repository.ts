import { ThemeMode } from "@common/store/store";

export interface SettingsRepository {
  getTheme(): ThemeMode;
  setTheme(theme: ThemeMode): void;
}
