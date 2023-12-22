import { initFakeRepositories } from "@common/UsecasesContext";
import { Housing } from "@domain/models/housing/Housing";
import { Home } from "@domain/models/housing/home/Home";
import { createUseUpdateHousing } from "@domain/usecases/updateHousing";

describe("updateHome", () => {
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
    const { updateHome } = createUseUpdateHousing(
      repositories.emissionsRepository,
    )();

    // Act
    updateHome({} as Home);

    // Assert
    expect(fetchHousingSpy).toHaveBeenCalledTimes(1);
    expect(updateHousingSpy).toHaveBeenCalledTimes(1);
  });

  it("should update housing with given home data", () => {
    // Arrange
    const fakeHousing = new Housing({});
    repositories.emissionsRepository.injectFakeHousing(fakeHousing);

    const fakeHome = new Home({
      livingSpace: 100,
      inhabitants: 3,
      ageInYears: 35,
      isAnApartment: true,
      isEcoBuilt: false,
    });

    const { updateHome } = createUseUpdateHousing(
      repositories.emissionsRepository,
    )();

    // Act
    updateHome(fakeHome);

    // Assert
    expect(updateHousingSpy).toHaveBeenCalledWith({
      home: fakeHome,
      energy: {
        ...fakeHousing.energy,
        inhabitants: fakeHome.inhabitants,
        livingSpace: fakeHome.livingSpace,
        isAnApartment: fakeHome.isAnApartment,
      },
      leisure: {
        ...fakeHousing.leisure,
        inhabitants: fakeHome.inhabitants,
        isAnApartment: fakeHome.isAnApartment,
      },
    });
  });
});
