import { initFakeRepositories } from "@common/UsecasesContext";
import { Housing } from "@domain/models/housing/Housing";
import { Leisure } from "@domain/models/housing/leisure/Leisure";
import { createUseUpdateHousing } from "@domain/usecases/updateHousing";

describe("updateLeisure", () => {
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
    const { updateLeisure } = createUseUpdateHousing(
      repositories.emissionsRepository,
    )();

    // Act
    updateLeisure({} as Leisure);

    // Assert
    expect(fetchHousingSpy).toHaveBeenCalledTimes(1);
    expect(updateHousingSpy).toHaveBeenCalledTimes(1);
  });

  it("should update housing with given leisure data", () => {
    // Arrange
    const fakeHousing = new Housing({});
    repositories.emissionsRepository.injectFakeHousing(fakeHousing);

    const fakeLeisure = new Leisure({
      isAnApartment: false,
      hasIngroundPool: true,
      inhabitants: 3,
      campingNightsPerYear: 5,
      exchangeNightsPerYear: 5,
      holidayAccomodations: {
        camping: true,
        exchange: true,
        hotel: false,
        rentals: false,
        youthHostel: true,
      },
      hotelNightsPerYear: 0,
      rentalNightsPerYear: 0,
      youthHostelNightsPerYear: 4,
    });

    const { updateLeisure } = createUseUpdateHousing(
      repositories.emissionsRepository,
    )();

    // Act
    updateLeisure(fakeLeisure);

    // Assert
    expect(updateHousingSpy).toHaveBeenCalledWith({
      ...fakeHousing,
      leisure: fakeLeisure,
    });
  });
});
