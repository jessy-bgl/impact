import {
  StopFlightAction,
  StopShortHaulFlightsAction,
  TakeFlightHalfAsMuchAction,
} from "@domain/entities/actions/transport/plane.actions";
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
        const action = new StopShortHaulFlightsAction(new Plane({}));
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

  describe("StopFlight action", () => {
    describe("isCompleted", () => {
      it("should be completed if the plane is not used", () => {
        // Arrange
        const plane = new Plane({ usage: false });
        // Act
        const action = new StopFlightAction(plane);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should set the saved footprint to 0 if the action is completed", () => {
        // Arrange
        const action = new StopFlightAction(new Plane({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equals to flights footprint", () => {
        // Arrange
        const plane = new Plane({
          usage: true,
          hoursPerYearInShortHaul: 4,
          hoursPerYearInLongHaul: 10,
          hoursPerYearInMediumHaul: 6,
        });
        const action = new StopFlightAction(plane);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(plane.annualFootprint);
      });
    });
  });

  describe("TakeFlightHalfAsMuch action", () => {
    describe("isCompleted", () => {
      it("should be completed if the plane is not used", () => {
        // Arrange
        const plane = new Plane({ usage: false });
        // Act
        const action = new TakeFlightHalfAsMuchAction(plane);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should set the saved footprint to 0 if the action is completed", () => {
        // Arrange
        const action = new TakeFlightHalfAsMuchAction(new Plane({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equals to flights footprint / 2", () => {
        // Arrange
        const plane = new Plane({
          usage: true,
          hoursPerYearInShortHaul: 4,
          hoursPerYearInLongHaul: 10,
          hoursPerYearInMediumHaul: 6,
        });
        const action = new TakeFlightHalfAsMuchAction(plane);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(
          Math.floor(plane.annualFootprint / 2),
        );
      });
    });
  });
});
