import { act, renderHook } from "@testing-library/react-native";

import { defaultAppStore } from "@common/store/store";
import { zustandAppStore } from "@common/store/store.zustand";

import { useFootprints } from "./useFootprints";

describe("useFootprints", () => {
  afterEach(async () => {
    await act(async () => {
      zustandAppStore.setState(defaultAppStore());
    });
  });

  it("splits valid footprints into a total and parts adding up to 100", async () => {
    const { result } = await renderHook(() => useFootprints());
    const { footprints, annualFootprint, isLoading } = result.current;

    const sum = (
      pick: (f: (typeof footprints)[keyof typeof footprints]) => number,
    ) => Object.values(footprints).reduce((acc, f) => acc + pick(f), 0);

    expect(annualFootprint).toBe(sum((f) => f.footprint));
    expect(sum((f) => f.part)).toBe(100);
    expect(isLoading).toBe(false);
  });

  it("is loading when a footprint value is NaN", async () => {
    const stored = zustandAppStore.getState();
    await act(async () => {
      zustandAppStore.setState({
        footprints: {
          ...stored.footprints,
          transport: {
            ...stored.footprints.transport,
            annualFootprint: NaN,
          } as unknown as typeof stored.footprints.transport,
        },
      });
    });

    const { result } = await renderHook(() => useFootprints());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.annualFootprint).toBeNaN();
  });
});
