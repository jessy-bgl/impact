import { ChangeForElectricScooterAction } from "@domain/entities/actions/transport/twoWheeler.actions";
import { TwoWheeler } from "@domain/entities/categories/transport/two-wheeler/TwoWheeler";

describe("TwoWheeler actions", () => {
  describe("ChangeForElectricScooter action", () => {
    it("should be completed if the two wheeler is an electric scooter", () => {
      // Arrange
      const twoWheeler = new TwoWheeler({
        usage: true,
        type: "electricScooter",
      });
      // Act
      const action = new ChangeForElectricScooterAction(twoWheeler);
      // Assert
      expect(action.isCompleted).toBe(true);
    });

    describe("computeSavedFootprint", () => {
      it("should set the saved footprint to 0 if the action is completed", () => {
        // Arrange
        const action = new ChangeForElectricScooterAction(new TwoWheeler({}));
        jest.spyOn(action, "isCompleted", "get").mockReturnValue(true);
        // Act
        action.computeSavedFootprint();
        // Assert
        expect(action.savedFootprint).toBe(0);
      });

      it(
        "should have a saved footprint equals to 466 kgCO2e if we drive 10000km" +
          "per year in thermal scooter and change a for an electric scooter",
        () => {
          // Arrange
          const twoWheeler = new TwoWheeler({
            usage: true,
            type: "thermalScooter",
            kmPerYear: 10000,
          });
          const action = new ChangeForElectricScooterAction(twoWheeler);
          // Act
          action.computeSavedFootprint();
          // Assert
          expect(action.savedFootprint).toBe(466);
        },
      );
    });
  });
});
