import { initFakeRepositories } from "@common/UsecasesContext";
import { createUseUpdateActions } from "@domain/usecases/actions/updateActions";

describe("update actions", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;

  beforeEach(() => {
    repositories = initFakeRepositories();
  });

  describe("actions store is empty", () => {
    it("should add actions to store", () => {
      // Arrange
      repositories.actionsRepository.actions = [];
      const { updateActions } = createUseUpdateActions(
        repositories.actionsRepository,
        repositories.emissionsRepository,
      )();
      // Act
      updateActions();
      // Assert
      expect(repositories.actionsRepository.actions.length).toBeGreaterThan(0);
    });
  });

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
