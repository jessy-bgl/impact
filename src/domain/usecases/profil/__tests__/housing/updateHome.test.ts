import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { Housing } from "@domain/entities/housing/Housing";
import { Home } from "@domain/entities/housing/home/Home";
import { createUseUpdateHousing } from "@domain/usecases/profil/updateHousing";

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
    const updateEverydayThingsSpy = jest.spyOn(
      repositories.emissionsRepository,
      "updateEverydayThings",
    );

    const fakeHousing = new Housing({});
    const fakeEverydayThings = new EverydayThings({});

    const fakeHome = new Home({
      livingSpace: 100,
      occupants: 3,
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
        occupants: fakeHome.occupants,
        livingSpace: fakeHome.livingSpace,
        isAnApartment: fakeHome.isAnApartment,
      },
      leisure: {
        ...fakeHousing.leisure,
        occupants: fakeHome.occupants,
        isAnApartment: fakeHome.isAnApartment,
      },
    });

    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      pets: {
        ...fakeEverydayThings.pets,
        occupants: fakeHome.occupants,
      },
      digital: {
        ...fakeEverydayThings.digital,
        occupants: fakeHome.occupants,
      },
      furniture: {
        ...fakeEverydayThings.furniture,
        occupants: fakeHome.occupants,
      },
      householdAppliances: {
        ...fakeEverydayThings.householdAppliances,
        occupants: fakeHome.occupants,
      },
    });
  });
});
