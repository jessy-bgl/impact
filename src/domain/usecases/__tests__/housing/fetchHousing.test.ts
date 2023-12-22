import { initFakeRepositories } from "@common/UsecasesContext";
import { createUseFetchHousing } from "@domain/usecases/fetchHousing";

describe("fetchHousing", () => {
  it("should call emissionsRepository.fetchHousing", () => {
    // Arrange
    const repositories = initFakeRepositories();
    const fetchHousingSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchHousing",
    );
    const { fetchHousing } = createUseFetchHousing(
      repositories.emissionsRepository,
    )();

    // Act
    fetchHousing();

    // Assert
    expect(fetchHousingSpy).toHaveBeenCalledTimes(1);
  });
});
