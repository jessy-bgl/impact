import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/models/everyday-things/EverydayThings";
import { Clothes } from "@domain/models/everyday-things/clothes/Clothes";
import { createUseUpdateEverydayThings } from "@domain/usecases/updateEverydayThings";

describe("updateClothes", () => {
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
    const { updateClothes } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateClothes({} as Clothes);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given Clothes data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeClothes = new Clothes({
      bigItems: 3,
      coat: 2,
      dresses: 1,
      pants: 2,
      shirts: 2,
      shoes: 2,
      shorts: 2,
      smallItems: 2,
      sweaters: 2,
      sweatshirts: 2,
      tshirts: 2,
    });

    const { updateClothes } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateClothes(fakeClothes);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      clothes: fakeClothes,
    });
  });
});
