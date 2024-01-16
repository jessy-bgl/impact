import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { Tobacco } from "@domain/entities/everyday-things/tobacco/Tobacco";
import { createUseUpdateEverydayThings } from "@domain/usecases/updateEverydayThings";

describe("updateTobacco", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;
  let fetchEverydayThingsSpy: jest.SpyInstance;
  let updateEverydayThingsSpy: jest.SpyInstance;

  beforeEach(() => {
    repositories = initFakeRepositories();
    fetchEverydayThingsSpy = jest.spyOn(
      repositories.emissionsRepository,
      "fetchEverydayThings",
    );
    updateEverydayThingsSpy = jest.spyOn(
      repositories.emissionsRepository,
      "updateEverydayThings",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call emissionsRepository.fetchEverydayThings and emissionsRepository.updateEverydayThings", () => {
    // Arrange
    const { updateTobacco } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateTobacco({} as Tobacco);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given Tobacco data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeTobacco = new Tobacco({
      weeklyConsumption: "onePackPerMonth",
    });

    const { updateTobacco } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateTobacco(fakeTobacco);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      tobacco: fakeTobacco,
    });
  });
});
