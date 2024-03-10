import { initFakeRepositories } from "@common/UsecasesContext";
import { StopShortHaulFlightsAction } from "@domain/entities/actions/transport/plane.actions";
import { Plane } from "@domain/entities/categories/transport/plane/Plane";
import { createUseUpdateActionState } from "@domain/usecases/actions/updateActionState";

describe("update action state", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;

  beforeEach(() => {
    repositories = initFakeRepositories();
  });

  it("should update action state", () => {
    // Arrange
    const action = new StopShortHaulFlightsAction(new Plane({}));
    action.state = "notStarted";
    repositories.actionsRepository.actions = [action];
    const { updateActionState } = createUseUpdateActionState(
      repositories.actionsRepository,
    )();
    // Act
    updateActionState(action.id, "completed");
    // Assert
    expect(repositories.actionsRepository.actions[0].state).toBe("completed");
  });
});
