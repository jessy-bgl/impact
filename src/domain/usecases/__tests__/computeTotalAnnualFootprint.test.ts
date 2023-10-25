import { initFakeRepositories } from "../../../common/UsecasesContext";
import { PublicServices } from "../../models/public-services/PublicServices";
import { Transport } from "../../models/transport/Transport";
import { createUseComputeTotalAnnualFootprint } from "../computeTotalAnnualFootprint";

describe("computeTotalAnnualFootprint", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let fetchTransportSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    fetchTransportSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchTransport",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a total annual footprint equal the sum of each category annual footprint", () => {
    // Arrange
    // TODO : ajouter les autres categories
    const fakeTransport = new Transport({});
    const fakePublicServices = new PublicServices();
    repositories.emissionsRepository.injectFakeTransport(fakeTransport);
    const { computeTotalAnnualFootprint } =
      createUseComputeTotalAnnualFootprint(repositories.emissionsRepository)();

    // Act
    const result = computeTotalAnnualFootprint();

    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    const expectedAnnualFootprint =
      fakeTransport.annualFootprint + fakePublicServices.annualFootprint;
    expect(result).toEqual(expectedAnnualFootprint);
  });
});
