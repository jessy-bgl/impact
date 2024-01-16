import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { HouseholdAppliances } from "@domain/entities/everyday-things/household-appliances/HouseholdAppliances";
import { createUseUpdateEverydayThings } from "@domain/usecases/updateEverydayThings";

describe("updateHouseholdAppliances", () => {
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
    const { updateHouseholdAppliances } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateHouseholdAppliances({} as HouseholdAppliances);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given HouseholdAppliances data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeHouseholdAppliances = new HouseholdAppliances({
      occupants: 3,
      coffeeMachines: 2,
      dishWashers: 1,
      dryers: 1,
      fridges: 1,
      electricLawnMowers: 1,
      freezers: 1,
      hoods: 0,
      hotPlates: 1,
      kettles: 1,
      kitchenRobots: 0,
      microwaves: 1,
      miniFridges: 1,
      ovens: 0,
      preservation: "high",
      vacuumCleaners: 1,
      washingMachines: 1,
    });

    const { updateHouseholdAppliances } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateHouseholdAppliances(fakeHouseholdAppliances);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      householdAppliances: fakeHouseholdAppliances,
    });
  });
});
