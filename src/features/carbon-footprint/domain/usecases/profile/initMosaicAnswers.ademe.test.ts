import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { createUpdateProfile } from "@carbonFootprint/domain/usecases/profile/updateProfile";

// Integration test against the real ADEME model: the follow-up rules of the
// "transports commun" mosaic are gated by `non applicable si "<option> = non"`,
// so they stay applicable as long as the option is undefined.
describe("initMosaicAnswers with the ADEME engine", () => {
  const questionKeys = Object.values(
    profileSections.publicTransport.questionKeys,
  );

  let computeEngine: AdemeComputeEngine;
  let profileRepository: ProfileStubRepository;
  let updateProfile: ReturnType<typeof createUpdateProfile>;

  const getQuestions = () =>
    computeEngine.getQuestions(
      profileRepository.fetchAdemeProfile(),
      questionKeys,
    );

  const initMosaicAnswers = () =>
    updateProfile.initMosaicAnswers(Object.values(getQuestions()));

  beforeEach(() => {
    computeEngine = new AdemeComputeEngine();
    profileRepository = new ProfileStubRepository();
    updateProfile = createUpdateProfile(
      computeEngine,
      profileRepository,
      new FootprintsStubRepository(),
    );
    computeEngine.setProfile({});
  });

  const followUpKeys: (keyof Profile)[] = [
    "transport . transports commun . bus . heures par semaine",
    "transport . transports commun . car . km par semaine",
    "transport . transports commun . métro ou tram . heures par semaine",
  ];

  it.each(followUpKeys)("hides %s while its option is unchecked", (key) => {
    expect(getQuestions()[key].isApplicable).toBe(true);

    initMosaicAnswers();

    expect(getQuestions()[key].isApplicable).toBe(false);
  });

  it("shows the follow-up question again once the option is checked", () => {
    initMosaicAnswers();

    updateProfile.updateTransportProfile(
      getQuestions()["transport . transports commun"].subQuestions!.find(
        (subQuestion) =>
          subQuestion.label === "transport . transports commun . bus . présent",
      )!,
      "oui",
    );

    expect(
      getQuestions()["transport . transports commun . bus . heures par semaine"]
        .isApplicable,
    ).toBe(true);
  });

  it("drops the default French average from the public transport footprint", () => {
    const before =
      computeEngine.computeTransportFootprint().publicTransportFootprint;

    initMosaicAnswers();

    expect(before).toBeGreaterThan(0);
    expect(
      computeEngine.computeTransportFootprint().publicTransportFootprint,
    ).toBe(0);
  });
});
