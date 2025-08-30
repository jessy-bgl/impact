import { AppStore } from "@common/store/store";

export interface IntroRepository {
  updateShowIntro(
    page: keyof AppStore["shouldShowIntro"],
    shouldShow: boolean,
  ): void;
}
