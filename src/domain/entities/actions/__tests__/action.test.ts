import { ActionState, actionStates } from "@domain/entities/actions/Action";
import { StopShortHaulFlightsAction } from "@domain/entities/actions/transport/plane.actions";
import { Plane } from "@domain/entities/categories/transport/plane/Plane";

describe("Action (generic)", () => {
  describe("init", () => {
    it("should set the state to notStarted and savedFootprint = 0", () => {
      // Act
      const action = new StopShortHaulFlightsAction(new Plane({}));
      // Assert
      expect(action.state).toBe("notStarted");
      expect(action.savedFootprint).toBe(0);
    });
  });

  describe("updateState", () => {
    it.each<ActionState>(actionStates)(
      "should set the state to completed if the action is completed",
      (currentActionState) => {
        // Arrange
        const action = new StopShortHaulFlightsAction(new Plane({}));
        action.state = currentActionState;
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.updateState();
        // Assert
        expect(action.state).toBe("completed");
      },
    );

    it("should set the state to notStarted if the action was completed but the saved footprint > 0", () => {
      // Arrange
      const action = new StopShortHaulFlightsAction(new Plane({}));
      action.state = "completed";
      action.savedFootprint = 1;
      // Act
      action.updateState();
      // Assert
      expect(action.state).toBe("notStarted");
    });
  });
});
