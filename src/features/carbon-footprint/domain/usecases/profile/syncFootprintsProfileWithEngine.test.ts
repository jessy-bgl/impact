import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { ComputeEngineStub } from "@carbonFootprint/domain/entities/engine/ComputeEngine.stub";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import {
  computeProfileSectionVersion,
  profileSections,
} from "@carbonFootprint/domain/entities/profile/profileSections";
import { createSyncFootprintsProfileWithEngine } from "@carbonFootprint/domain/usecases/profile/syncFootprintsProfileWithEngine";

type RawRules = ReturnType<typeof AdemeEngine.getRules>;

const fakeSelectRule = (options: string[]) => ({
  rawNode: { question: "stub question", "une possibilité": options },
});
const fakeNumericRule = () => ({ rawNode: { question: "stub question" } });

describe("syncFootprintsProfileWithEngine", () => {
  let profileStub: ProfileStubRepository;
  let footprintsStub: FootprintsStubRepository;
  let engineStub: ComputeEngineStub;
  let syncFootprintsProfileWithEngine: ReturnType<
    typeof createSyncFootprintsProfileWithEngine
  >["syncFootprintsProfileWithEngine"];

  beforeEach(() => {
    profileStub = new ProfileStubRepository();
    footprintsStub = new FootprintsStubRepository();
    engineStub = new ComputeEngineStub();

    ({ syncFootprintsProfileWithEngine } =
      createSyncFootprintsProfileWithEngine(
        engineStub,
        profileStub,
        footprintsStub,
      ));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("footprint computation", () => {
    it("sets the stored profile on the engine before computing", async () => {
      profileStub.profile = { "transport . voiture . km": 15000 } as Profile;
      await syncFootprintsProfileWithEngine();
      expect(engineStub.lastProfile).toEqual({
        "transport . voiture . km": 15000,
      });
    });

    it("stores all 5 computed footprints from the engine", async () => {
      await syncFootprintsProfileWithEngine();
      expect(footprintsStub.transport).toBe(engineStub.transportFootprint);
      expect(footprintsStub.food).toBe(engineStub.foodFootprint);
      expect(footprintsStub.housing).toBe(engineStub.housingFootprint);
      expect(footprintsStub.everydayThings).toBe(
        engineStub.everydayThingsFootprint,
      );
      expect(footprintsStub.societalServices).toBe(
        engineStub.societalServicesFootprint,
      );
    });

    it("does not remove profile keys or track versions when handleMigration is false", async () => {
      profileStub.setTestProfileKey("some . key", 5);
      await syncFootprintsProfileWithEngine();
      expect(profileStub.getTestProfileKey("some . key")).toBe(5);
      expect(profileStub.completionVersions).toEqual({});
    });
  });

  // engine rules: avion usager (select with 3 options) + vols annuels (numeric)
  describe("profile migration (handleMigration: true)", () => {
    beforeEach(() => {
      jest.spyOn(AdemeEngine, "getRules").mockReturnValue({
        "transport . avion . usager": fakeSelectRule([
          "jamais",
          "occasionnellement",
          "fréquemment",
        ]),
        "transport . avion . vols annuels": fakeNumericRule(),
      } as unknown as RawRules);
    });

    it.each([
      {
        name: "removes a key no longer in the engine",
        key: "stale . key",
        stored: 5,
        expected: undefined,
      },
      {
        name: "keeps a numeric value on a numeric question",
        key: "transport . avion . vols annuels",
        stored: 5,
        expected: 5,
      },
      {
        name: "removes a string value from a numeric question (select → numeric type change)",
        key: "transport . avion . vols annuels",
        stored: "'beaucoup'",
        expected: undefined,
      },
      {
        name: "keeps a boolean answer (oui/non) on a non-select question",
        key: "transport . avion . vols annuels",
        stored: "oui",
        expected: "oui",
      },
      {
        name: "keeps a valid select value",
        key: "transport . avion . usager",
        stored: "'jamais'",
        expected: "'jamais'",
      },
      {
        name: "removes an invalid select value (yes/no → select type change)",
        key: "transport . avion . usager",
        stored: "oui",
        expected: undefined,
      },
    ])("$name", async ({ key, stored, expected }) => {
      profileStub.setTestProfileKey(key, stored);

      await syncFootprintsProfileWithEngine({ handleMigration: true });

      expect(profileStub.getTestProfileKey(key)).toBe(expected);
    });
  });

  // engine has no rules — all profile keys are stripped after migration;
  // test focus is on version tracking logic, not key removal
  describe("completion version tracking (handleMigration: true)", () => {
    // Pure function — safe to compute at describe scope
    const planeVersion = computeProfileSectionVersion(
      profileSections.plane.questionKeys,
    );

    beforeEach(() => {
      jest
        .spyOn(AdemeEngine, "getRules")
        .mockReturnValue({} as unknown as RawRules);
    });

    // The real-world case: a past ADEME update replaced the plane question keys,
    // so every install carried a version string no longer matching the section.
    it("resets completion when stored version differs from current version", async () => {
      profileStub.completionVersions = {
        transport: { plane: "outdated-version" },
      };
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(profileStub.completion.transport?.plane).toBe(false);
    });

    it("does not reset completion when stored version matches current version", async () => {
      profileStub.completionVersions = { transport: { plane: planeVersion } };
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(profileStub.completion.transport?.plane).toBeUndefined();
    });

    it("resets completion when no version stored and no current section keys are answered", async () => {
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(profileStub.completion.transport?.plane).toBe(false);
    });

    it("does not reset completion when no version stored but a current section key is answered", async () => {
      jest.spyOn(AdemeEngine, "getRules").mockReturnValue({
        "transport . avion . usager": fakeSelectRule([
          "jamais",
          "occasionnellement",
          "fréquemment",
        ]),
      } as unknown as RawRules);
      profileStub.setTestProfileKey("transport . avion . usager", "'jamais'");

      await syncFootprintsProfileWithEngine({ handleMigration: true });

      expect(profileStub.completion.transport?.plane).toBeUndefined();
    });

    it("always updates the stored version to the current version", async () => {
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(profileStub.completionVersions.transport?.plane).toBe(
        planeVersion,
      );
    });
  });
});
