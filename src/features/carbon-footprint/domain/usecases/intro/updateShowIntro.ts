import { IntroRepository } from "@carbonFootprint/domain/repositories/intro.repository";

export const createUpdateShowIntro = (repository: IntroRepository) => {
  const setShouldShowAppIntro = (show: boolean) => {
    repository.updateShowIntro("app", show);
  };

  const setShouldShowProfileIntro = (show: boolean) => {
    repository.updateShowIntro("profile", show);
  };

  const setShouldShowActionsIntro = (show: boolean) => {
    repository.updateShowIntro("actions", show);
  };

  return {
    setShouldShowAppIntro,
    setShouldShowProfileIntro,
    setShouldShowActionsIntro,
  };
};
