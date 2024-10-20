import { initFakeRepositories } from "@common/UsecasesContext";
import { AdemeAction } from "@domain/entities/action/AdemeAction";
import { createUpdateActionState } from "@domain/usecases/actions/updateActionState";

describe("update action state", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;

  beforeEach(() => {
    repositories = initFakeRepositories();
  });

  it("should update action state", () => {
    // Arrange
    // TODO : create a fake action rule
    const action = new AdemeAction({});
    action.state = "notStarted";
    repositories.actionsRepository.actions = [action];
    const updateActionState = createUpdateActionState(
      repositories.actionsRepository,
    );
    // Act
    updateActionState(action.id, "inProgress");
    // Assert
    expect(action.state).toBe("inProgress");
  });
});
