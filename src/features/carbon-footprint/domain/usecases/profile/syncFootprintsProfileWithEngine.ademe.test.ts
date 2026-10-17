import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import {
  computeProfileSectionVersion,
  profileSections,
} from "@carbonFootprint/domain/entities/profile/profileSections";
import { createSyncFootprintsProfileWithEngine } from "@carbonFootprint/domain/usecases/profile/syncFootprintsProfileWithEngine";

// Integration test against the real ADEME model. The yes/no defaults live in the
// model itself (see `ademe-model-patch`), so the footprints of a fresh install
// must already be free of the French average for every section — including the
// ones the user never opened — without the sync writing a single answer.
// The footprint values themselves are pinned by the engine's `default profile`
// snapshot; what matters here is what the sync does with them.
// Snapshot recording is not what these tests are about; it has its own suite in
// `usecases/history/recordFootprintsSnapshot.test.ts`.
const recordFootprintsSnapshot = () => {};

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
        recordFootprintsSnapshot,
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

  // nosgestesclimat 4.17 split the air conditioning questions by heat pump and
  // turned the breakfast type into a selection: a user who completed both
  // sections before the update has to answer them again.
  describe("after an update that replaced some question keys", () => {
    const { energy, meals } = profileSections;
    const { heatPumpCoolingUsage: _added, ...energyKeysKept } =
      energy.questionKeys;
    const legacyEnergyKeys = {
      ...energyKeysKept,
      airConditioningUsage: "logement . climatisation . présent",
      airConditioningNumber: "logement . climatisation . nombre",
    } as unknown as Record<string, keyof Profile>;
    const legacyMealsKeys = {
      ...meals.questionKeys,
      breakfast: "alimentation . petit déjeuner . type",
    } as unknown as Record<string, keyof Profile>;

    beforeEach(() => {
      for (const section of Object.values(profileSections)) {
        profileRepository.updateProfileCompletion(
          section.category,
          section.subCategory,
          true,
        );
        profileRepository.updateProfileCompletionVersion(
          section.category,
          section.subCategory,
          computeProfileSectionVersion(section.questionKeys),
        );
      }
      profileRepository.updateProfileCompletionVersion(
        energy.category,
        energy.subCategory,
        computeProfileSectionVersion(legacyEnergyKeys),
      );
      profileRepository.updateProfileCompletionVersion(
        meals.category,
        meals.subCategory,
        computeProfileSectionVersion(legacyMealsKeys),
      );
      profileRepository.setTestProfileKey(
        "logement . climatisation . présent",
        "'oui et utilisation'",
      );
      profileRepository.setTestProfileKey(
        "alimentation . petit déjeuner . type",
        "'continental'",
      );
    });

    it("marks only the sections whose questions changed as not completed", async () => {
      await syncFootprintsProfileWithEngine({ handleMigration: true });

      const notCompleted = Object.values(profileSections)
        .filter(
          ({ category, subCategory }) =>
            profileRepository.completion[category]?.[subCategory] !== true,
        )
        .map(({ subCategory }) => subCategory);
      expect(notCompleted).toEqual([energy.subCategory, meals.subCategory]);
    });

    it("drops the answers to the removed questions", async () => {
      await syncFootprintsProfileWithEngine({ handleMigration: true });

      expect(profileRepository.profile).toEqual({});
    });
  });
});
