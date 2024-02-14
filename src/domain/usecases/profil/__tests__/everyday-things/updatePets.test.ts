import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { Pets } from "@domain/entities/everyday-things/pets/Pets";
import { createUseUpdateEverydayThings } from "@domain/usecases/profil/updateEverydayThings";

describe("updatePets", () => {
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
    const { updatePets } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updatePets({} as Pets);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with the given Pets data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakePets = new Pets({
      occupants: 3,
      cats: 2,
      smallDogs: 1,
      mediumDogs: 0,
      bigDogs: 0,
    });

    const { updatePets } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updatePets(fakePets);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      pets: fakePets,
    });
  });
});
