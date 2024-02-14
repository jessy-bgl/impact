import { initFakeRepositories } from "@common/UsecasesContext";
import { Housing } from "@domain/entities/housing/Housing";
import { Energy } from "@domain/entities/housing/energy/Energy";
import { createUseUpdateHousing } from "@domain/usecases/profil/updateHousing";

describe("updateEnergy", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let fetchHousingSpy: jest.SpyInstance;
  let updateHousingSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    fetchHousingSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchHousing",
    );
    updateHousingSpy = jest.spyOn(
      repositories.emissionsRepository,
      "updateHousing",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call emissionsRepository.fetchHousing and emissionsRepository.updateHousing", () => {
    // Arrange
    const { updateEnergy } = createUseUpdateHousing(
      repositories.emissionsRepository,
    )();

    // Act
    updateEnergy({} as Energy);

    // Assert
    expect(fetchHousingSpy).toHaveBeenCalledTimes(1);
    expect(updateHousingSpy).toHaveBeenCalledTimes(1);
  });

  it("should update housing with given energy data", () => {
    // Arrange
    const fakeHousing = new Housing({});

    const fakeEnergy = new Energy({
      occupants: 3,
      livingSpace: 100,
      isAnApartment: true,
      airConditioners: 1,
      annualElectricityConsumption: 1000,
      heatingEnergies: {
        bioGas: false,
        electricity: true,
        fuel: false,
        gas: false,
        wood: true,
        gasCylinder: false,
        heatNetwork: false,
        heatPump: true,
        propane: false,
      },
      woodType: "pellets",
    });

    const { updateEnergy } = createUseUpdateHousing(
      repositories.emissionsRepository,
    )();

    // Act
    updateEnergy(fakeEnergy);

    // Assert
    expect(updateHousingSpy).toHaveBeenCalledWith({
      ...fakeHousing,
      energy: fakeEnergy,
    });
  });
});
