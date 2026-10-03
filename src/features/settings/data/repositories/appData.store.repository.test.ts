import { ActionStub } from "@carbonFootprint/domain/entities/action/Action.stub";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { defaultAppStore } from "@common/store/store";
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

  it("should reset the footprints to their default values", () => {
    useAppStore.setState({
      footprints: {
        ...defaultAppStore().footprints,
        transport: new TransportFootprint({ carFootprint: 4200 }),
      },
    });

    repository.clearLocalData();

    expect(useAppStore.getState().footprints).toEqual(
      defaultAppStore().footprints,
    );
  });

  it("should erase the actions", () => {
    useAppStore.setState({ actions: [new ActionStub("some.action")] });

    repository.clearLocalData();

    expect(useAppStore.getState().actions).toEqual([]);
  });

  it("should reset the profile to its default values", () => {
    useAppStore.setState({
      profile: {
        ademe: { "transport . voiture . km": 12000 },
        completion: {
          ...defaultAppStore().profile.completion,
          transport: {
            ...defaultAppStore().profile.completion.transport,
            car: true,
          },
        },
        completionVersions: {
          ...defaultAppStore().profile.completionVersions,
          transport: { car: "1.0.0" },
        },
      },
    });

    repository.clearLocalData();

    expect(useAppStore.getState().profile).toEqual(defaultAppStore().profile);
  });
});
