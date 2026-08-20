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

  // The history is a record of the user's own past footprints, so "clear my
  // data" has to take it with everything else.
  it("should erase the footprints history", () => {
    useAppStore.setState({
      footprintsHistory: [
        {
          date: "2026-03-12",
          footprints: {
            transport: 3100,
            food: 2400,
            housing: 3500,
            everydayThings: 1200,
            societalServices: 1500,
          },
        },
      ],
    });

    repository.clearLocalData();

    expect(useAppStore.getState().footprintsHistory).toEqual([]);
  });
});
