import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { createSyncEngineWithStoredActions } from "@carbonFootprint/domain/usecases/actions/syncEngineWithStoredActions";
import { initFakeRepositories } from "@common/context/UsecasesContext";

class StubAction extends Action {
  constructor(id: string) {
    super({ id, label: "", description: "", category: "transport" });
  }
}

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

  describe("actions store is empty", () => {
    it("should add actions to store", () => {
      syncEngineWithStoredActions();
      expect(repositories.actionsRepository.actions.length).toBeGreaterThan(0);
    });
  });

  describe("actions store is not empty", () => {
    beforeEach(() => {
      syncEngineWithStoredActions(); // pre-populate store with default profile
    });

    describe("actions and profile did not change", () => {
      it("should restore each action state independently", () => {
        const [a, b, c] = repositories.actionsRepository.actions;
        a.state = "inProgress";
        b.state = "skipped";
        // c stays "notStarted"

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

      syncEngineWithStoredActions();

      const updated = repositories.actionsRepository.actions.find(
        (a) => a.id === target.id,
      );
      expect(updated?.savedFootprint).toBe(engineFootprint);
    });

    it("should preserve action states when profile changes", () => {
      const target = repositories.actionsRepository.actions[0];
      target.state = "inProgress";

      repositories.computeEngine.setProfile({
        "transport . voiture . km": 30000,
      } as Profile);
      syncEngineWithStoredActions();

      const afterSync = repositories.actionsRepository.actions.find(
        (a) => a.id === target.id,
      );
      expect(afterSync).toBeDefined();
      expect(afterSync?.state).toBe("inProgress");
    });

    it("should remove stale actions no longer returned by the engine", () => {
      const staleId = "actions . fake . obsolete";
      repositories.actionsRepository.actions.push(new StubAction(staleId));

      syncEngineWithStoredActions();

      expect(
        repositories.actionsRepository.actions.find((a) => a.id === staleId),
      ).toBeUndefined();
    });

    it("should add new model actions to store with notStarted state", () => {
      const [removed, ...rest] = repositories.actionsRepository.actions;
      repositories.actionsRepository.actions = rest;

      syncEngineWithStoredActions();

      const added = repositories.actionsRepository.actions.find(
        (a) => a.id === removed.id,
      );
      expect(added).toBeDefined();
      expect(added?.state).toBe("notStarted");
    });
  });
});
