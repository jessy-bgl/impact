import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/everyday-things/EverydayThings";
import { OtherProducts } from "@domain/entities/everyday-things/other-products/OtherProducts";
import { createUseUpdateEverydayThings } from "@domain/usecases/profil/updateEverydayThings";

describe("updateOtherProducts", () => {
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
    const { updateOtherProducts } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateOtherProducts({} as OtherProducts);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given OtherProducts data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeOtherProducts = new OtherProducts({
      spendingLevel: "high",
    });

    const { updateOtherProducts } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateOtherProducts(fakeOtherProducts);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      otherProducts: fakeOtherProducts,
    });
  });
});
