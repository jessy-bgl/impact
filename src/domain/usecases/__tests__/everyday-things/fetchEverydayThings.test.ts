import { initFakeRepositories } from "@common/UsecasesContext";
import { createUseFetchEverydayThings } from "@domain/usecases/fetchEverydayThings";

describe("fetchEverydayThings", () => {
  it("should call emissionsRepository.fetchEverydayThings", () => {
    // Arrange
    const repositories = initFakeRepositories();
    const fetchEverydayThingsSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchEverydayThings",
    );
    const { fetchEverydayThings } = createUseFetchEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    fetchEverydayThings();

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });
});
