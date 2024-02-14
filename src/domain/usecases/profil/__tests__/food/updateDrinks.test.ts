import { initFakeRepositories } from "@common/UsecasesContext";
import { Food } from "@domain/entities/food/Food";
import { Drinks } from "@domain/entities/food/drinks/Drinks";
import { defaultHotDrinksPerWeek } from "@domain/entities/food/drinks/constants";
import { createUseUpdateFood } from "@domain/usecases/profil/updateFood";

describe("updateDrinks", () => {
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
    const { updateDrinks } = createUseUpdateFood(
      repositories.emissionsRepository,
    )();

    // Act
    updateDrinks({} as Drinks);

    // Assert
    expect(fetchFoodSpy).toHaveBeenCalledTimes(1);
    expect(updateFoodSpy).toHaveBeenCalledTimes(1);
  });

  it("should update food with given drinks data", () => {
    // Arrange
    const fakeFood = new Food({});

    const fakeDrinks = new Drinks({
      alcoholLitersPerWeek: 2,
      bottledWater: true,
      sodaLitersPerWeek: 2,
      hotDrinksPerWeek: defaultHotDrinksPerWeek,
    });

    const { updateDrinks } = createUseUpdateFood(
      repositories.emissionsRepository,
    )();

    // Act
    updateDrinks(fakeDrinks);

    // Assert
    expect(updateFoodSpy).toHaveBeenCalledWith({
      ...fakeFood,
      drinks: fakeDrinks,
    });
  });
});
