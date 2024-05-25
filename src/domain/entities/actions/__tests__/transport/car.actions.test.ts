import { CarSharing } from "@domain/entities/actions/transport/car.actions";
import { Car } from "@domain/entities/categories/transport/car/Car";

describe("Car actions", () => {
  describe("CarSharing action", () => {
    describe("isCompleted", () => {
      it("should be completed if the car is not used", () => {
        // Arrange
        const car = new Car({ kmPerYear: 0 });
        // Act
        const action = new CarSharing(car);
        // Assert
        expect(action.isCompleted).toBe(true);
      });

      it("should be completed if not a regular user", () => {
        // Arrange
        const car = new Car({ kmPerYear: 1000, regularUser: false });
        // Act
        const action = new CarSharing(car);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("isApplicable", () => {
      it("should not be applicable if the annual distance is less than or equal to 7200 km", () => {
        // Arrange
        const car = new Car({ kmPerYear: 7200 });
        // Act
        const action = new CarSharing(car);
        // Assert
        expect(action.isApplicable).toBe(false);
      });

      it("should be applicable if the annual distance is greater than 7200 km", () => {
        // Arrange
        const car = new Car({ kmPerYear: 7201 });
        // Act
        const action = new CarSharing(car);
        // Assert
        expect(action.isApplicable).toBe(true);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should have a saved footprint equals to 0 if the action is completed", () => {
        // Arrange
        const action = new CarSharing(new Car({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equals to 813 kgCO2e if we drive 10000 km per year", () => {
        // Arrange
        const car = new Car({ kmPerYear: 10000, regularUser: true });
        const action = new CarSharing(car);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(813);
      });
    });
  });
});
