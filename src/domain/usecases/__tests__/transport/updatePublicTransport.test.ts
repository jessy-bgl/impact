import { initFakeRepositories } from "@common/UsecasesContext";
import { Transport } from "@domain/models/transport/Transport";
import { PublicTransport } from "@domain/models/transport/public-transport/PublicTransport";
import { createUseUpdateTransport } from "@domain/usecases/updateTransport";

describe("updatePublicTransport", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let updateTransportSpy: jest.SpyInstance;
  let fetchTransportSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    updateTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "updateTransport",
    );
    fetchTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchTransport",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call emissionsRepository.fetchTransport and emissionsRepository.updateTransport", () => {
    // Arrange
    const { updatePublicTransport } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updatePublicTransport({} as PublicTransport);

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(updateTransportSpy).toHaveBeenCalledTimes(1);
  });

  it("should update transport with given public-transport data", () => {
    // Arrange
    const fakeTransport = new Transport({});
    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    const fakePublicTransport = new PublicTransport({
      hoursPerWeekInBus: 5,
      hoursPerWeekInMetro: 10,
      hoursPerYearInTrain: 1000,
    });
    const { updatePublicTransport } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updatePublicTransport(fakePublicTransport);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      publicTransport: fakePublicTransport,
    });
  });
});
