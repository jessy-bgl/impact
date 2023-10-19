import { initFakeRepositories } from "../../../common/UsecasesContext";
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

  it("should return total annual footprint", () => {
    // Arrange
    const fakeData = new Transport({});
    repositories.emissionsRepository.injectData(fakeData);
    const { computeTotalAnnualFootprint } =
      createUseComputeTotalAnnualFootprint(repositories.emissionsRepository)();
    // Act
    const result = computeTotalAnnualFootprint();
    // Assert
    expect(fetchTransportSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeData.annualFootprint);
  });
});
