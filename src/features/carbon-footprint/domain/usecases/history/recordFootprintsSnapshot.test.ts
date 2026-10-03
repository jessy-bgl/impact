import { FootprintsStubRepository } from "@carbonFootprint/data/repositories/footprints.stub.repository";
import { FootprintsHistoryStubRepository } from "@carbonFootprint/data/repositories/footprintsHistory.stub.repository";
import { ProfileStubRepository } from "@carbonFootprint/data/repositories/profile.stub.repository";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { createRecordFootprintsSnapshot } from "@carbonFootprint/domain/usecases/history/recordFootprintsSnapshot";
import { ClockStub } from "@common/data/clock.stub";

describe("createRecordFootprintsSnapshot", () => {
  let clock: ClockStub;
  let profileRepository: ProfileStubRepository;
  let footprintsRepository: FootprintsStubRepository;
  let historyRepository: FootprintsHistoryStubRepository;
  let recordFootprintsSnapshot: () => void;

  const completeProfile = () =>
    Object.values(profileSections).forEach(({ category, subCategory }) =>
      profileRepository.updateProfileCompletion(category, subCategory, true),
    );

  const setTransportFootprint = (carFootprint: number) =>
    footprintsRepository.updateTransportFootprint(
      new TransportFootprint({ carFootprint }),
    );

  beforeEach(() => {
    clock = new ClockStub();
    profileRepository = new ProfileStubRepository();
    footprintsRepository = new FootprintsStubRepository();
    historyRepository = new FootprintsHistoryStubRepository();

    ({ recordFootprintsSnapshot } = createRecordFootprintsSnapshot(
      clock,
      profileRepository,
      footprintsRepository,
      historyRepository,
    ));
  });

  it("records nothing while the profile is incomplete", () => {
    setTransportFootprint(3100);

    recordFootprintsSnapshot();

    expect(historyRepository.history).toEqual([]);
  });

  it("records nothing when only some sections are validated", () => {
    const [first] = Object.values(profileSections);
    profileRepository.updateProfileCompletion(
      first.category,
      first.subCategory,
      true,
    );
    setTransportFootprint(3100);

    recordFootprintsSnapshot();

    expect(historyRepository.history).toEqual([]);
  });

  describe("with a completed profile", () => {
    beforeEach(completeProfile);

    it("records the first snapshot under the clock's day", () => {
      clock.current = new Date(2026, 2, 12, 10, 0);
      setTransportFootprint(3100);

      recordFootprintsSnapshot();

      expect(historyRepository.history).toEqual([
        {
          date: "2026-03-12",
          footprints: {
            transport: 3100,
            food: 0,
            housing: 0,
            everydayThings: 0,
            societalServices: 0,
          },
        },
      ]);
    });

    it("keeps a single entry when the footprint changes twice the same day", () => {
      clock.current = new Date(2026, 2, 12, 10, 0);
      setTransportFootprint(3100);
      recordFootprintsSnapshot();

      setTransportFootprint(2900);
      recordFootprintsSnapshot();

      expect(historyRepository.history).toHaveLength(1);
      expect(historyRepository.history[0].footprints.transport).toBe(2900);
    });

    it("appends a point when a later day has a different footprint", () => {
      clock.current = new Date(2026, 2, 12, 10, 0);
      setTransportFootprint(3100);
      recordFootprintsSnapshot();

      clock.current = new Date(2026, 4, 14, 10, 0);
      setTransportFootprint(2900);
      recordFootprintsSnapshot();

      expect(historyRepository.history.map(({ date }) => date)).toEqual([
        "2026-03-12",
        "2026-05-14",
      ]);
    });

    // Every app start runs the engine sync, which records unconditionally.
    it("ignores a later day whose footprint is unchanged", () => {
      clock.current = new Date(2026, 2, 12, 10, 0);
      setTransportFootprint(3100);
      recordFootprintsSnapshot();

      clock.current = new Date(2026, 4, 14, 10, 0);
      recordFootprintsSnapshot();
      clock.current = new Date(2026, 6, 2, 10, 0);
      recordFootprintsSnapshot();

      expect(historyRepository.history.map(({ date }) => date)).toEqual([
        "2026-03-12",
      ]);
    });

    it("tracks a category other than the one that changed first", () => {
      clock.current = new Date(2026, 2, 12, 10, 0);
      setTransportFootprint(3100);
      recordFootprintsSnapshot();

      clock.current = new Date(2026, 4, 14, 10, 0);
      footprintsRepository.updateHousingFootprint(
        new HousingFootprint({ homeFootprint: 3500 }),
      );
      recordFootprintsSnapshot();

      expect(historyRepository.history[1].footprints).toEqual({
        transport: 3100,
        food: 0,
        housing: 3500,
        everydayThings: 0,
        societalServices: 0,
      });
    });

    // A rehydrated store holds bare objects with no `annualFootprint` getter.
    it("records nothing when a category total is not a finite number", () => {
      footprintsRepository.housing = {
        homeFootprint: 3500,
      } as unknown as HousingFootprint;

      recordFootprintsSnapshot();

      expect(historyRepository.history).toEqual([]);
    });
  });
});
