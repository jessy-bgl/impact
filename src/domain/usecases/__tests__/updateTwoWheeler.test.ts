import { initFakeRepositories } from "../../../common/UsecasesContext";
import { Transport } from "../../models/transport/Transport";
import { TwoWheeler } from "../../models/transport/two-wheeler/TwoWheeler";
import { createUseUpdateTransport } from "../updateTransport";

describe("updateTwoWheeler", () => {
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
    const { updateTwoWheeler } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateTwoWheeler({} as TwoWheeler);

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(updateTransportSpy).toHaveBeenCalledTimes(1);
  });

  it("should update transport with given two-wheeler data for a user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    const fakeTwoWheelerWithUsage = new TwoWheeler({
      usage: true,
      kmPerYear: 1000,
      type: "electricScooter",
    });
    const { updateTwoWheeler } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateTwoWheeler(fakeTwoWheelerWithUsage);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      twoWheeler: fakeTwoWheelerWithUsage,
    });
  });

  it("should update transport with default two-wheeler data for a non-user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    const fakeTwoWheelerWithoutUsage = new TwoWheeler({
      usage: false,
      kmPerYear: 1000,
      type: "electricScooter",
    });
    const { updateTwoWheeler } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateTwoWheeler(fakeTwoWheelerWithoutUsage);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      twoWheeler: { ...new TwoWheeler({ usage: false }) },
    });
  });
});
