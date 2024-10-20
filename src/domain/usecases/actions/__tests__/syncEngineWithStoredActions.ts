import { initFakeRepositories } from "@common/UsecasesContext";
import { createSyncEngineWithStoredActions } from "@domain/usecases/actions/syncEngineWithStoredActions";

describe("update actions", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;

  beforeEach(() => {
    repositories = initFakeRepositories();
  });

  describe("actions store is empty", () => {
    it("should add actions to store", () => {
      // Arrange
      repositories.actionsRepository.actions = [];
      const updateActions = createSyncEngineWithStoredActions(
        repositories.actionsRepository,
      );
      // Act
      updateActions();
      // Assert
      expect(repositories.actionsRepository.actions.length).toBeGreaterThan(0);
    });
  });

  // TODO
  describe("actions store is not empty", () => {
    describe("actions and profil did not change", () => {
      it("should restore saved actions state and footprint", () => {});
    });

    describe("actions computation changed", () => {
      it("should update actions state and footprint", () => {});
    });

    describe("profil changed", () => {
      it("should update actions state and footprint", () => {});
    });

    describe("an action has been removed", () => {
      it("should remove action from store", () => {});
    });

    describe("an action has been added", () => {
      it("should add action to store", () => {});
    });
  });
});
