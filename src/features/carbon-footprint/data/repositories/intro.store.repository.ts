import { IntroRepository } from "@carbonFootprint/domain/repositories/intro.repository";
import { AppStore } from "@common/store/store";
import { useAppStore } from "@common/store/useStore";

export class IntroStoreRepository implements IntroRepository {
  constructor(private store: typeof useAppStore) {}

  updateShowIntro(page: keyof AppStore["shouldShowIntro"], show: boolean) {
    this.store.setState((state) => ({
      ...state,
      shouldShowIntro: {
        ...state.shouldShowIntro,
        [page]: show,
      },
    }));
  }
}
