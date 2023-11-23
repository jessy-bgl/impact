import { initFakeRepositories } from "../../../../common/UsecasesContext";
import { Food } from "../../../models/food/Food";
import { Waste } from "../../../models/food/waste/Waste";
import { createUseUpdateFood } from "../../updateFood";

describe("updateWaste", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let fetchFoodSpy: jest.SpyInstance;
  let updateFoodSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    fetchFoodSpy = jest.spyOn(repositories.emissionsRepository, "fetchFood");
    updateFoodSpy = jest.spyOn(repositories.emissionsRepository, "updateFood");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call emissionsRepository.fetchFood and emissionsRepository.updateFood", () => {
    // Arrange
    const { updateWaste } = createUseUpdateFood(
      repositories.emissionsRepository,
    )();

    // Act
    updateWaste({} as Waste);

    // Assert
    expect(fetchFoodSpy).toHaveBeenCalledTimes(1);
    expect(updateFoodSpy).toHaveBeenCalledTimes(1);
  });

  it("should update food with given waste data", () => {
    // Arrange
    const fakeFood = new Food({});
    repositories.emissionsRepository.injectFakeFood(fakeFood);

    const fakeWaste = new Waste({
      quantity: "base",
      wasteBonuses: {
        stopAdvertisingSticker: true,
        noFoodWaste: false,
        wasteComposting: false,
      },
    });

    const { updateWaste } = createUseUpdateFood(
      repositories.emissionsRepository,
    )();

    // Act
    updateWaste(fakeWaste);

    // Assert
    expect(updateFoodSpy).toHaveBeenCalledWith({
      ...fakeFood,
      waste: fakeWaste,
    });
  });
});
