import { ThemeMode } from "@common/store/store";
import { SettingsRepository } from "@settings/domain/repositories/settings.repository";

export const createSetTheme = (repository: SettingsRepository) => {
  const setTheme = (theme: ThemeMode) => {
    repository.setTheme(theme);
  };

  return { setTheme };
};
