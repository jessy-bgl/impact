import { StopShortHaulFlightsAction } from "@domain/entities/actions/transport/plane.actions";
import { Plane } from "@domain/entities/categories/transport/plane/Plane";

describe("Plane actions", () => {
  describe("StopShortHaulFlights action", () => {
    describe("isCompleted", () => {
      it("should be completed if the annual short haul distance is equal to 0", () => {
        // Arrange
        const plane = new Plane({ usage: true, hoursPerYearInShortHaul: 0 });
        // Act
        const action = new StopShortHaulFlightsAction(plane);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should set the saved footprint to 0 if the action is completed", () => {
        // Arrange
        const plane = new Plane({});
        const action = new StopShortHaulFlightsAction(plane);
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equals to 1102 kgCO2e if we plane 10 hours in short hauls", () => {
        // Arrange
        const plane = new Plane({ usage: true, hoursPerYearInShortHaul: 10 });
        const action = new StopShortHaulFlightsAction(plane);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(1102);
      });
    });
  });
});
