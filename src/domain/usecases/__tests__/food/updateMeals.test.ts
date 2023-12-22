import { initFakeRepositories } from "@common/UsecasesContext";
import { Food } from "@domain/models/food/Food";
import { Meals } from "@domain/models/food/meals/Meals";
import { createUseUpdateFood } from "@domain/usecases/updateFood";

describe("updateMeals", () => {
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
    const { updateMeals } = createUseUpdateFood(
      repositories.emissionsRepository,
    )();

    // Act
    updateMeals({} as Meals);

    // Assert
    expect(fetchFoodSpy).toHaveBeenCalledTimes(1);
    expect(updateFoodSpy).toHaveBeenCalledTimes(1);
  });

  it("should update food with given meals data", () => {
    // Arrange
    const fakeFood = new Food({});

    const fakeMeals = new Meals({
      seasonalProducts: "always",
      breakfast: "british",
      localProducts: "always",
      diet: "vegetarian",
    });

    const { updateMeals } = createUseUpdateFood(
      repositories.emissionsRepository,
    )();

    // Act
    updateMeals(fakeMeals);

    // Assert
    expect(updateFoodSpy).toHaveBeenCalledWith({
      ...fakeFood,
      meals: fakeMeals,
    });
  });
});
