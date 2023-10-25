import { initFakeRepositories } from "../../../common/UsecasesContext";
import { createUseFetchPublicServices } from "../fetchPublicServices";

describe("fetchPublicServices", () => {
  it("should call emissionsRepository.fetchPublicServices", () => {
    // Arrange
    const repositories = initFakeRepositories();
    const fetchPublicServicesSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchPublicServices",
    );
    const { fetchPublicServices } = createUseFetchPublicServices(
      repositories.emissionsRepository,
    )();

    // Act
    fetchPublicServices();

    // Assert
    expect(fetchPublicServicesSpy).toHaveBeenCalledTimes(1);
  });
});
