import { initFakeRepositories } from "@common/UsecasesContext";
import { Transport } from "@domain/entities/transport/Transport";
import { Boat } from "@domain/entities/transport/boat/Boat";
import { createUseUpdateTransport } from "@domain/usecases/updateTransport";

describe("updateBoat", () => {
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
    const { updateBoat } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateBoat({} as Boat);

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(updateTransportSpy).toHaveBeenCalledTimes(1);
  });

  it("should update transport with given boat data for a regular user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    const fakeBoatWithUsage = new Boat({
      usage: true,
      hoursPerYear: 4,
    });
    const { updateBoat } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateBoat(fakeBoatWithUsage);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      boat: fakeBoatWithUsage,
    });
  });

  it("should update transport with default plane data for a non-user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    const fakeBoatWithoutUsage = new Boat({
      usage: false,
      hoursPerYear: 4,
    });
    const { updateBoat } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateBoat(fakeBoatWithoutUsage);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      boat: { ...new Boat({ usage: false }) },
    });
  });
});
