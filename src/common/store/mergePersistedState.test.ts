import { mergePersistedState } from "@common/store/mergePersistedState";
import { AppStore } from "@common/store/store";
import { defaultAppStoreValues } from "@common/store/storeDefaultValues";

const currentState = defaultAppStoreValues;

describe("mergePersistedState", () => {
  it("keeps the persisted answers over the default ones", () => {
    const persistedState = {
      profile: { ademe: { "transport . voiture . km": 12000 } },
    } as unknown as AppStore;

    const merged = mergePersistedState(persistedState, currentState);

    expect(merged.profile.ademe).toEqual({ "transport . voiture . km": 12000 });
    expect(merged.theme).toBe(currentState.theme);
  });

  // `arrayMerge` replaces rather than concatenates, so a rehydration must not
  // duplicate or interleave the snapshots.
  it("replaces the default footprints history with the persisted one", () => {
    const footprintsHistory = [
      {
        date: "2026-03-12",
        footprints: {
          transport: 3100,
          food: 2400,
          housing: 3500,
          everydayThings: 1200,
          societalServices: 1500,
        },
      },
    ];
    const persistedState = { footprintsHistory } as unknown as AppStore;

    const merged = mergePersistedState(persistedState, currentState);

    expect(merged.footprintsHistory).toEqual(footprintsHistory);
  });

  it("keeps the persisted completion of a known sub-category", () => {
    const persistedState = {
      profile: { completion: { transport: { car: true } } },
    } as unknown as AppStore;

    const merged = mergePersistedState(persistedState, currentState);

    expect(merged.profile.completion.transport.car).toBe(true);
    expect(merged.profile.completion.transport.plane).toBe(false);
  });

  it("drops the completion of a sub-category the app no longer knows about", () => {
    // Without this, `every(Boolean)` over the persisted record would keep the
    // category incomplete forever for users who already opened the app.
    const persistedState = {
      profile: {
        completion: {
          transport: { boat: false, car: true },
          everydayThings: { otherProducts: false, pets: true },
        },
      },
    } as unknown as AppStore;

    const merged = mergePersistedState(persistedState, currentState);

    expect(merged.profile.completion.transport).not.toHaveProperty("boat");
    expect(merged.profile.completion.everydayThings).not.toHaveProperty(
      "otherProducts",
    );
  });

  it("exposes every known sub-category, even one absent from the persisted state", () => {
    const persistedState = {
      profile: { completion: { transport: { car: true } } },
    } as unknown as AppStore;

    const merged = mergePersistedState(persistedState, currentState);

    expect(Object.keys(merged.profile.completion).sort()).toEqual(
      Object.keys(currentState.profile.completion).sort(),
    );
    Object.entries(currentState.profile.completion).forEach(
      ([category, subCategories]) => {
        expect(
          Object.keys(
            merged.profile.completion[
              category as keyof AppStore["profile"]["completion"]
            ],
          ).sort(),
        ).toEqual(Object.keys(subCategories).sort());
      },
    );
  });
});
