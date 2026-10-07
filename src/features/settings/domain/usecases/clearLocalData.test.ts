import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { ComputeEngineStub } from "@carbonFootprint/domain/entities/engine/ComputeEngine.stub";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { createSyncFootprintsProfileWithEngine } from "@carbonFootprint/domain/usecases/profile/syncFootprintsProfileWithEngine";
import { AppDataStubRepository } from "@settings/data/repositories/appData.stub.repository";
import { createClearLocalData } from "@settings/domain/usecases/clearLocalData";

describe("clearLocalData", () => {
  let profileStub: ProfileStubRepository;
  let footprintsStub: FootprintsStubRepository;
  let engineStub: ComputeEngineStub;
  let clearLocalData: ReturnType<typeof createClearLocalData>["clearLocalData"];

  beforeEach(async () => {
    profileStub = new ProfileStubRepository();
    footprintsStub = new FootprintsStubRepository();
    engineStub = new ComputeEngineStub();

    const { syncFootprintsProfileWithEngine } =
      createSyncFootprintsProfileWithEngine(
        engineStub,
        profileStub,
        footprintsStub,
        () => {},
      );

    ({ clearLocalData } = createClearLocalData(
      new AppDataStubRepository(profileStub),
      syncFootprintsProfileWithEngine,
    ));

    profileStub.profile = { "transport . voiture . km": 15000 } as Profile;
    await syncFootprintsProfileWithEngine();
  });

  it("hands the engine the cleared profile", async () => {
    await clearLocalData();

    expect(engineStub.getProfile()).toEqual({});
  });

  it("stores the footprints computed from the cleared profile", async () => {
    const clearedTransportFootprint = new TransportFootprint({});
    engineStub.transportFootprint = clearedTransportFootprint;

    await clearLocalData();

    expect(footprintsStub.transport).toBe(clearedTransportFootprint);
  });
});
