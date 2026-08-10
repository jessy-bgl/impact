import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { createSyncFootprintsProfileWithEngine } from "@carbonFootprint/domain/usecases/profile/syncFootprintsProfileWithEngine";

// Integration test against the real ADEME model. The yes/no defaults live in the
// model itself (see `ademe-model-patch`), so the footprints of a fresh install
// must already be free of the French average for every section — including the
// ones the user never opened — without the sync writing a single answer.
// The footprint values themselves are pinned by the engine's `default profile`
// snapshot; what matters here is what the sync does with them.
describe("syncFootprintsProfileWithEngine with the ADEME engine", () => {
  let computeEngine: AdemeComputeEngine;
  let profileRepository: ProfileStubRepository;
  let footprintsRepository: FootprintsStubRepository;
  let syncFootprintsProfileWithEngine: ReturnType<
    typeof createSyncFootprintsProfileWithEngine
  >["syncFootprintsProfileWithEngine"];

  beforeEach(() => {
    computeEngine = new AdemeComputeEngine();
    profileRepository = new ProfileStubRepository();
    footprintsRepository = new FootprintsStubRepository();

    ({ syncFootprintsProfileWithEngine } =
      createSyncFootprintsProfileWithEngine(
        computeEngine,
        profileRepository,
        footprintsRepository,
      ));

    // The ADEME engine holds its situation statically: clear what a previous
    // test left behind.
    computeEngine.setProfile({});
  });

  it("keeps the French average out of the sections the user never opened", async () => {
    await syncFootprintsProfileWithEngine();

    expect(footprintsRepository.transport?.twoWheelerFootprint).toBe(0);
    expect(footprintsRepository.transport?.publicTransportFootprint).toBe(0);
    expect(footprintsRepository.housing?.leisureFootprint).toBe(0);
  });

  it("persists no answer of its own", async () => {
    await syncFootprintsProfileWithEngine({ handleMigration: true });

    expect(profileRepository.profile).toEqual({});
  });

  it("counts a section in once the user answers its yes/no question", async () => {
    profileRepository.setTestProfileKey(
      "transport . deux roues . usager",
      "oui",
    );

    await syncFootprintsProfileWithEngine();

    expect(profileRepository.profile["transport . deux roues . usager"]).toBe(
      "oui",
    );
    expect(footprintsRepository.transport?.twoWheelerFootprint).toBeGreaterThan(
      0,
    );
  });
});
