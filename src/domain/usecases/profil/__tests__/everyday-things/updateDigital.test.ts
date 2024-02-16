import { initFakeRepositories } from "@common/UsecasesContext";
import { EverydayThings } from "@domain/entities/categories/everyday-things/EverydayThings";
import { Digital } from "@domain/entities/categories/everyday-things/digital/Digital";
import { createUseUpdateEverydayThings } from "@domain/usecases/profil/updateEverydayThings";

describe("updateDigital", () => {
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
    const { updateDigital } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateDigital({} as Digital);

    // Assert
    expect(fetchEverydayThingsSpy).toHaveBeenCalledTimes(1);
    expect(updateEverydayThingsSpy).toHaveBeenCalledTimes(1);
  });

  it("should update EverydayThings with given Digital data", () => {
    // Arrange
    const fakeEverydayThings = new EverydayThings({});

    const fakeDigital = new Digital({
      bluetoothSpeakers: 1,
      cameras: 1,
      desktopComputers: 1,
      gamingConsoles: 1,
      homeCinemas: 1,
      occupants: 3,
      internetDailyHours: 1,
      laptops: 1,
      mobilePhones: 2,
      portableConsoles: 1,
      preservation: "low",
      smartWatches: 1,
      tablets: 1,
      televisions: 1,
      videoProjectors: 1,
      vocalSpeakers: 1,
    });

    const { updateDigital } = createUseUpdateEverydayThings(
      repositories.emissionsRepository,
    )();

    // Act
    updateDigital(fakeDigital);

    // Assert
    expect(updateEverydayThingsSpy).toHaveBeenCalledWith({
      ...fakeEverydayThings,
      digital: fakeDigital,
    });
  });
});
