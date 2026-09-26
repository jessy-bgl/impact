import { ActionStub } from "@carbonFootprint/domain/entities/action/Action.stub";
import { createSyncEngineWithStoredActions } from "@carbonFootprint/domain/usecases/actions/syncEngineWithStoredActions";
import { initFakeRepositories } from "@common/context/UsecasesContext";

describe("syncEngineWithStoredActions", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let syncEngineWithStoredActions: () => void;

  beforeEach(() => {
    repositories = initFakeRepositories();
    repositories.computeEngine.setProfile({});
    ({ syncEngineWithStoredActions } = createSyncEngineWithStoredActions(
      repositories.computeEngine,
      repositories.actionsRepository,
    ));
  });

  // Actions only depend on the engine situation: a new profile set on the
  // engine is what makes a synchronization compute again.
  const changeProfile = (km: number) => {
    repositories.computeEngine.setProfile({ "transport . voiture . km": km });
  };

  describe("engine holds no profile yet", () => {
    it("should leave the stored actions untouched", () => {
      const { computeEngine, actionsRepository } = initFakeRepositories();
      const stored = [new ActionStub("actions . stored")];
      actionsRepository.updateActions(stored);
      const { syncEngineWithStoredActions: sync } =
        createSyncEngineWithStoredActions(computeEngine, actionsRepository);

      sync();

      expect(actionsRepository.fetchActions()).toBe(stored);
    });
  });

  describe("actions store is empty", () => {
    it("should populate the store with the engine's actions", () => {
      const engineActions = repositories.computeEngine.getActions();

      syncEngineWithStoredActions();

      expect(repositories.actionsRepository.actions.map((a) => a.id)).toEqual(
        engineActions.map((a) => a.id),
      );
    });
  });

  describe("actions store is not empty", () => {
    beforeEach(() => {
      syncEngineWithStoredActions(); // pre-populate store with default profile
    });

    describe("profile did not change", () => {
      it("should keep the stored actions as they are", () => {
        const before = repositories.actionsRepository.actions;

        syncEngineWithStoredActions();

        expect(repositories.actionsRepository.actions).toBe(before);
      });
    });

    describe("profile changed", () => {
      it("should restore each action state independently", () => {
        const [a, b, c] = repositories.actionsRepository.actions;
        a.state = "inProgress";
        b.state = "skipped";
        // c stays "notStarted"

        changeProfile(30000);
        syncEngineWithStoredActions();

        const find = (id: string) =>
          repositories.actionsRepository.actions.find((x) => x.id === id);
        expect(find(a.id)?.state).toBe("inProgress");
        expect(find(b.id)?.state).toBe("skipped");
        expect(find(c.id)?.state).toBe("notStarted");
      });
    });

    it("should recompute savedFootprint from engine, not from store", () => {
      const target = repositories.actionsRepository.actions[0];
      const engineFootprint = target.savedFootprint;
      target.savedFootprint = 999999;

      changeProfile(30000);
      syncEngineWithStoredActions();

      const updated = repositories.actionsRepository.actions.find(
        (a) => a.id === target.id,
      );
      expect(updated?.savedFootprint).toBe(engineFootprint);
    });

    it("should preserve action states when profile changes", () => {
      const target = repositories.actionsRepository.actions[0];
      target.state = "inProgress";

      changeProfile(30000);
      syncEngineWithStoredActions();

      const afterSync = repositories.actionsRepository.actions.find(
        (a) => a.id === target.id,
      );
      expect(afterSync).toBeDefined();
      expect(afterSync?.state).toBe("inProgress");
    });

    it("should remove stale actions no longer returned by the engine", () => {
      const staleId = "actions . fake . obsolete";
      repositories.actionsRepository.actions.push(new ActionStub(staleId));

      changeProfile(30000);
      syncEngineWithStoredActions();

      expect(
        repositories.actionsRepository.actions.find((a) => a.id === staleId),
      ).toBeUndefined();
    });

    it("should add new model actions to store with notStarted state", () => {
      const [removed, ...rest] = repositories.actionsRepository.actions;
      repositories.actionsRepository.actions = rest;

      changeProfile(30000);
      syncEngineWithStoredActions();

      const added = repositories.actionsRepository.actions.find(
        (a) => a.id === removed.id,
      );
      expect(added).toBeDefined();
      expect(added?.state).toBe("notStarted");
    });
  });
});
