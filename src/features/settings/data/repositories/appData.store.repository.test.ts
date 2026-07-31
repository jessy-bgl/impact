import { useAppStore } from "@common/store/useStore";
import { AppDataStoreRepository } from "@settings/data/repositories/appData.store.repository";

describe("AppDataStoreRepository", () => {
  let repository: AppDataStoreRepository;

  beforeEach(() => {
    repository = new AppDataStoreRepository(useAppStore);
  });

  it("should preserve the analytics consent decision", () => {
    const analyticsConsent = {
      state: "denied" as const,
      decidedAt: "2026-07-28T10:00:00.000Z",
      policyVersion: "2026-07-27",
    };
    useAppStore.setState({ analyticsConsent });

    repository.clearLocalData();

    expect(useAppStore.getState().analyticsConsent).toEqual(analyticsConsent);
  });
});
