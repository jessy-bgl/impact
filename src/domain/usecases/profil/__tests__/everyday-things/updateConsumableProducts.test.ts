import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { ConsumableProducts } from "@domain/entities/everyday-things/consumable-products/ConsumableProducts";
import { createUseUpdateEverydayThings } from "@domain/usecases/profil/updateEverydayThings";

describe("updateConsumableProducts", () => {
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
    const { updateConsumableProducts } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateConsumableProducts({} as ConsumableProducts);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given ConsumableProducts data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeConsumableProducts = new ConsumableProducts({
      consumption: "high",
    });

    const { updateConsumableProducts } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateConsumableProducts(fakeConsumableProducts);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      consumableProducts: fakeConsumableProducts,
    });
  });
});
