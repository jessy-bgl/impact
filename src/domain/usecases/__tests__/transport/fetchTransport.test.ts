import { initFakeRepositories } from "@common/UsecasesContext";
import { createUseFetchTransport } from "@domain/usecases/fetchTransport";

describe("fetchTransport", () => {
  it("should call emissionsRepository.fetchTransport", () => {
    // Arrange
    const repositories = initFakeRepositories();
    const fetchTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchTransport",
    );
    const { fetchTransport } = createUseFetchTransport(
      repositories.emissionsRepository,
    )();
    // Act
    fetchTransport();
    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
  });
});
