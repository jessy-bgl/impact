import { initFakeRepositories } from "@common/UsecasesContext";
import { createUseFetchFood } from "@domain/usecases/profil/fetchFood";

describe("fetchFood", () => {
  it("should call emissionsRepository.fetchFood", () => {
    // Arrange
    const repositories = initFakeRepositories();
    const fetchFoodSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchFood",
    );
    const { fetchFood } = createUseFetchFood(
      repositories.emissionsRepository,
    )();
    // Act
    fetchFood();
    // Assert
    expect(fetchFoodSpy).toHaveBeenCalledTimes(1);
  });
});
