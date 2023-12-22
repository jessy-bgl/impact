import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/models/everyday-things/EverydayThings";
import { Hobbies } from "@domain/models/everyday-things/hobbies/Hobbies";
import { createUseUpdateEverydayThings } from "@domain/usecases/updateEverydayThings";

describe("updateHobbies", () => {
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
    const { updateHobbies } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateHobbies({} as Hobbies);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given Hobbies data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeHobbies = new Hobbies({
      athletics: true,
      ballSport: false,
      concertsAndShows: true,
      editions: true,
      golf: false,
      gym: true,
      martialSport: false,
      motorSport: false,
      museumsAndMonuments: false,
      music: true,
      otherSport: false,
      outdoorIndividualSport: true,
      riding: false,
      swimming: false,
      waterSport: false,
      winterSport: false,
    });

    const { updateHobbies } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateHobbies(fakeHobbies);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      hobbies: fakeHobbies,
    });
  });
});
