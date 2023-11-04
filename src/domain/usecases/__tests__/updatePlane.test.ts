import { initFakeRepositories } from "../../../common/UsecasesContext";
import { Transport } from "../../models/transport/Transport";
import { Plane } from "../../models/transport/plane/Plane";
import { createUseUpdateTransport } from "../updateTransport";

describe("updatePlane", () => {
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
    const { updatePlane } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updatePlane({} as Plane);

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(updateTransportSpy).toHaveBeenCalledTimes(1);
  });

  it("should update transport with given two-wheeler data for a regular user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    const fakePlaneWithUsage = new Plane({
      usage: true,
      hoursPerYearInLongHaul: 2,
      hoursPerYearInMediumHaul: 2,
      hoursPerYearInShortHaul: 2,
    });
    const { updatePlane } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updatePlane(fakePlaneWithUsage);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      plane: fakePlaneWithUsage,
    });
  });

  it("should update transport with default plane data for a non-user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    const fakePlaneWithoutUsage = new Plane({
      usage: false,
      hoursPerYearInLongHaul: 2,
      hoursPerYearInMediumHaul: 2,
      hoursPerYearInShortHaul: 2,
    });
    const { updatePlane } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updatePlane(fakePlaneWithoutUsage);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      plane: { ...new Plane({ usage: false }) },
    });
  });
});