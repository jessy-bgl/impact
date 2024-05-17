import {
  StopFerryAction,
  TakeFerryHalfAsMuchAction,
} from "@domain/entities/actions/transport/boat.actions";
import { Boat } from "@domain/entities/categories/transport/boat/Boat";

describe("Boat actions", () => {
  describe("StopFerry action", () => {
    describe("isCompleted", () => {
      it("should be completed if the ferry is not used", () => {
        // Arrange
        const ferry = new Boat({ usage: false });
        // Act
        const action = new StopFerryAction(ferry);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should set the saved footprint to 0 if the action is completed", () => {
        // Arrange
        const action = new StopFerryAction(new Boat({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equals to 99 kgCO2e if we use the ferry 10 hours", () => {
        // Arrange
        const ferry = new Boat({ usage: true, hoursPerYear: 10 });
        const action = new StopFerryAction(ferry);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(99);
      });
    });
  });

  describe("TakeFerryHalfAsMuch action", () => {
    describe("isCompleted", () => {
      it("should be completed if the annual hours are equal to 0", () => {
        // Arrange
        const ferry = new Boat({ usage: true, hoursPerYear: 0 });
        // Act
        const action = new TakeFerryHalfAsMuchAction(ferry);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should set the saved footprint to 0 if the action is completed", () => {
        // Arrange
        const action = new TakeFerryHalfAsMuchAction(new Boat({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equals to 50 kgCO2e if we use the ferry 10 hours", () => {
        // Arrange
        const ferry = new Boat({ usage: true, hoursPerYear: 10 });
        const action = new TakeFerryHalfAsMuchAction(ferry);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(49);
      });
    });
  });
});
