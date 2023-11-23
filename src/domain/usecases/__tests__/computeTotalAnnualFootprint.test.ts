import { initFakeRepositories } from "../../../common/UsecasesContext";
import { Food } from "../../models/food/Food";
import { PublicServices } from "../../models/public-services/PublicServices";
import { Transport } from "../../models/transport/Transport";
import { createUseComputeTotalAnnualFootprint } from "../computeTotalAnnualFootprint";

describe("computeTotalAnnualFootprint", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let fetchTransportSpy: jest.SpyInstance;
  let fetchFoodSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    fetchTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchTransport",
    );
    fetchFoodSpy = jest.spyOn(repositories.emissionsRepository, "fetchFood");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a total annual footprint equal the sum of each category annual footprint", () => {
    // Arrange
    const fakeTransport = new Transport({});
    const fakeFood = new Food({});
    // TODO : ajouter les autres categories
    const fakePublicServices = new PublicServices();

    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    repositories.emissionsRepository.injectFakeFood(fakeFood);

    const { computeTotalAnnualFootprint } =
      createUseComputeTotalAnnualFootprint(repositories.emissionsRepository)();

    // Act
    const annualFootprint = computeTotalAnnualFootprint();

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(fetchFoodSpy).toHaveBeenCalledTimes(1);

    const expectedAnnualFootprint =
      fakeTransport.annualFootprint +
      fakeFood.annualFootprint +
      fakePublicServices.annualFootprint;

    expect(annualFootprint).toEqual(expectedAnnualFootprint);
  });
});
