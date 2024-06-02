import {
  CarSharing,
  ReduceCarSize,
  UseElectricCar,
} from "@domain/entities/actions/transport/car.actions";
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
      it("should have a saved footprint equal to 0 if the action is completed", () => {
        // Arrange
        const action = new CarSharing(new Car({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it("should have a saved footprint equal to 813 kgCO2e if we drive 10000 km per year", () => {
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

  describe("UseElectricCar action", () => {
    describe("isCompleted", () => {
      it("should be completed if the car is electric", () => {
        // Arrange
        const car = new Car({ engine: "electric" });
        // Act
        const action = new UseElectricCar(car);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("isApplicable", () => {
      it("should not be applicable if the car is not used", () => {
        // Arrange
        const car = new Car({ kmPerYear: 0 });
        // Act
        const action = new UseElectricCar(car);
        // Assert
        expect(action.isApplicable).toBe(false);
      });

      it("should not be applicable if not a regular user", () => {
        // Arrange
        const car = new Car({ kmPerYear: 1000, regularUser: false });
        // Act
        const action = new UseElectricCar(car);
        // Assert
        expect(action.isApplicable).toBe(false);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should have a saved footprint equal to 0 if the action is completed", () => {
        // Arrange
        const action = new UseElectricCar(new Car({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it(
        "should have a saved footprint equal to 1424 kgCO2e if we drive " +
          "10000 km/year with a 10 years old medium size gazole car, with an " +
          "average consumption of 6L/100km, and we switch to an electric car",
        () => {
          // Arrange
          const car = new Car({
            kmPerYear: 10000,
            averagePassengers: 1,
            regularUser: true,
            engine: "thermal",
            size: "medium",
            fuelType: "gasoline",
            averageFuelConsumption: 6,
            age: 10,
          });
          const action = new UseElectricCar(car);
          // Act
          action.computeSavedFootprint();
          // Assert
          expect(action.savedFootprint).toBe(1424);
        },
      );
    });
  });

  describe("ReduceCarSize action", () => {
    describe("isCompleted", () => {
      it("should be completed if the car is small", () => {
        // Arrange
        const car = new Car({ size: "small" });
        // Act
        const action = new ReduceCarSize(car);
        // Assert
        expect(action.isCompleted).toBe(true);
      });
    });

    describe("isApplicable", () => {
      it("should not be applicable if the car is not used", () => {
        // Arrange
        const car = new Car({ kmPerYear: 0 });
        // Act
        const action = new ReduceCarSize(car);
        // Assert
        expect(action.isApplicable).toBe(false);
      });

      it("should not be applicable if not a regular user", () => {
        // Arrange
        const car = new Car({ kmPerYear: 1000, regularUser: false });
        // Act
        const action = new ReduceCarSize(car);
        // Assert
        expect(action.isApplicable).toBe(false);
      });
    });

    describe("computeSavedFootprint", () => {
      it("should have a saved footprint equal to 0 if the action is completed", () => {
        // Arrange
        const action = new ReduceCarSize(new Car({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it(
        "should have a saved footprint equal to 90 kgCO2e if we drive " +
          "10000 km/year with a 5 years old sedan size gazole car, with an " +
          "average consumption of 6L/100km, and we switch to a small car",
        () => {
          // Arrange
          const car = new Car({
            kmPerYear: 10000,
            averagePassengers: 1,
            regularUser: true,
            engine: "thermal",
            size: "sedan",
            fuelType: "gasoline",
            averageFuelConsumption: 6,
            age: 5,
          });
          const action = new ReduceCarSize(car);
          // Act
          action.computeSavedFootprint();
          // Assert
          expect(action.savedFootprint).toBe(90);
        },
      );
    });
  });
});
