import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/categories/everyday-things/EverydayThings";
import { Furniture } from "@domain/entities/categories/everyday-things/furniture/Furniture";
import { createUseUpdateEverydayThings } from "@domain/usecases/profil/updateEverydayThings";

describe("updateFurniture", () => {
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
    const { updateFurniture } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateFurniture({} as Furniture);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given Furniture data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeFurniture = new Furniture({
      beds: 2,
      bigFurnitures: 2,
      chairs: 2,
      tables: 2,
      wardrobes: 2,
      couches: 2,
      occupants: 3,
      mattresses: 1,
      preservation: "low",
      resinOrMetalGardenFurnitures: 2,
      smallFurnitures: 2,
    });

    const { updateFurniture } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateFurniture(fakeFurniture);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      furniture: fakeFurniture,
    });
  });
});
