import { initFakeRepositories } from "@common/UsecasesContext";
import { Transport } from "@domain/entities/transport/Transport";
import { Car } from "@domain/entities/transport/car/Car";
import { createUseUpdateTransport } from "@domain/usecases/profil/updateTransport";

describe("updateCar", () => {
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
    const { updateCar } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateCar({} as Car);

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(updateTransportSpy).toHaveBeenCalledTimes(1);
  });

  it("should update transport with given car data for a regular user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    const fakeCarWithRegularUser = new Car({ regularUser: true });
    const { updateCar } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateCar(fakeCarWithRegularUser);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      car: fakeCarWithRegularUser,
    });
  });

  it("should update transport with default car data for a non-regular user", () => {
    // Arrange
    const fakeTransport = new Transport({});
    const updateTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "updateTransport",
    );
    const fakeCarWithNonRegularUser = new Car({
      regularUser: false,
      size: "small",
      engine: "electric",
      fuelType: "biofuels",
      averageFuelConsumption: 1,
    });
    const { updateCar } = createUseUpdateTransport(
      repositories.emissionsRepository,
    )();

    // Act
    updateCar(fakeCarWithNonRegularUser);

    // Assert
    expect(updateTransportSpy).toHaveBeenCalledWith({
      ...fakeTransport,
      car: { ...new Car({ regularUser: false }) },
    });
  });
});
