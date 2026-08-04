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

    it("removes keys no longer in the engine", async () => {
      profileStub.setTestProfileKey("stale . key", 5);
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(profileStub.getTestProfileKey("stale . key")).toBeUndefined();
    });

    it("keeps valid numeric keys", async () => {
      profileStub.setTestProfileKey("transport . avion . vols annuels", 5);
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(
        profileStub.getTestProfileKey("transport . avion . vols annuels"),
      ).toBe(5);
    });

    it("removes invalid select value (yes/no → select type change)", async () => {
      profileStub.setTestProfileKey("transport . avion . usager", "oui");
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(
        profileStub.getTestProfileKey("transport . avion . usager"),
      ).toBeUndefined();
    });

    it("keeps a valid select value", async () => {
      profileStub.setTestProfileKey("transport . avion . usager", "'jamais'");
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(profileStub.getTestProfileKey("transport . avion . usager")).toBe(
        "'jamais'",
      );
    });

    it("keeps a valid boolean answer (oui/non) for a non-select question", async () => {
      profileStub.setTestProfileKey("transport . avion . vols annuels", "oui");
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(
        profileStub.getTestProfileKey("transport . avion . vols annuels"),
      ).toBe("oui");
    });

    it("removes string value from a numeric question (select → numeric type change)", async () => {
      profileStub.setTestProfileKey(
        "transport . avion . vols annuels",
        "'beaucoup'",
      );
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(
        profileStub.getTestProfileKey("transport . avion . vols annuels"),
      ).toBeUndefined();
    });

    it("keeps numeric value for a numeric question", async () => {
      profileStub.setTestProfileKey("transport . avion . vols annuels", 10);
      await syncFootprintsProfileWithEngine({ handleMigration: true });
      expect(
        profileStub.getTestProfileKey("transport . avion . vols annuels"),
      ).toBe(10);
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

  describe("end-to-end scenarios", () => {
    it("resets plane completion after ADEME update changed the plane question keys", async () => {
      jest
        .spyOn(AdemeEngine, "getRules")
        .mockReturnValue({} as unknown as RawRules);

      // Documents the outdated key set from a real past engine update
      const outdatedVersion =
        "transport . avion . court courrier . heures de vol" +
        "|transport . avion . long courrier . heures de vol" +
        "|transport . avion . moyen courrier . heures de vol" +
        "|transport . avion . usager";
      profileStub.completionVersions = {
        transport: { plane: outdatedVersion },
      };

      await syncFootprintsProfileWithEngine({ handleMigration: true });

      expect(profileStub.completion.transport?.plane).toBe(false);
    });

    it("clears a type-changed stored value and resets completion because no current key survived migration", async () => {
      jest.spyOn(AdemeEngine, "getRules").mockReturnValue({
        "transport . avion . usager": fakeSelectRule([
          "jamais",
          "occasionnellement",
          "fréquemment",
        ]),
      } as unknown as RawRules);
      profileStub.setTestProfileKey("transport . avion . usager", "oui");

      await syncFootprintsProfileWithEngine({ handleMigration: true });

      expect(
        profileStub.getTestProfileKey("transport . avion . usager"),
      ).toBeUndefined();
      expect(profileStub.completion.transport?.plane).toBe(false);
    });
  });
});
