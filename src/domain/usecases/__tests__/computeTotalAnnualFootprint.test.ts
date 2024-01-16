import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { Food } from "@domain/entities/food/Food";
import { Housing } from "@domain/entities/housing/Housing";
import { PublicServices } from "@domain/entities/public-services/PublicServices";
import { Transport } from "@domain/entities/transport/Transport";
import { createUseComputeTotalAnnualFootprint } from "@domain/usecases/computeTotalAnnualFootprint";

describe("computeTotalAnnualFootprint", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let fetchTransportSpy: jest.SpyInstance;
  let fetchFoodSpy: jest.SpyInstance;
  let fetchHousingSpy: jest.SpyInstance;
  let fetchEverydayThingsSpy: jest.SpyInstance;
  let fetchPublicServicesSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    fetchTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchTransport",
    );
    fetchFoodSpy = jest.spyOn(repositories.emissionsRepository, "fetchFood");
    fetchHousingSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchHousing",
    );
    fetchEverydayThingsSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchEverydayThings",
    );
    fetchPublicServicesSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchPublicServices",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a total annual footprint equal the sum of each category annual footprint", () => {
    // Arrange
    const fakeTransport = new Transport({});
    const fakeFood = new Food({});
    const fakeHousing = new Housing({});
    const fakeEverydayThings = new EverydayThings({});
    const fakePublicServices = new PublicServices();

    const { computeTotalAnnualFootprint } =
      createUseComputeTotalAnnualFootprint(repositories.emissionsRepository)();

    // Act
    const annualFootprint = computeTotalAnnualFootprint();

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(fetchFoodSpy).toHaveBeenCalledTimes(1);
    expect(fetchHousingSpy).toHaveBeenCalledTimes(1);
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(fetchPublicServicesSpy).toHaveBeenCalledTimes(1);

    const expectedAnnualFootprint =
      fakeTransport.annualFootprint +
      fakeFood.annualFootprint +
      fakeHousing.annualFootprint +
      fakeEverydayThings.annualFootprint +
      fakePublicServices.annualFootprint;

    expect(annualFootprint).toEqual(expectedAnnualFootprint);
  });
});
