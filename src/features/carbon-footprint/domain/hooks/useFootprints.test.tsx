import { renderHook } from "@testing-library/react-native";

import { defaultAppStore } from "@common/store/store";
import { zustandAppStore } from "@common/store/store.zustand";

import { useFootprints } from "./useFootprints";

describe("useFootprints", () => {
  afterEach(() => {
    zustandAppStore.setState(defaultAppStore());
  });

  it("annualFootprint is the sum of category footprints", () => {
    const { result } = renderHook(() => useFootprints());
    const { footprints, annualFootprint } = result.current;
    const sum = Object.values(footprints).reduce(
      (acc, f) => acc + f.footprint,
      0,
    );
    expect(annualFootprint).toBe(sum);
  });

  it("category parts sum to exactly 100", () => {
    const { result } = renderHook(() => useFootprints());
    const total = Object.values(result.current.footprints).reduce(
      (acc, f) => acc + f.part,
      0,
    );
    expect(total).toBe(100);
  });

  it("is not loading when footprints are valid", () => {
    const { result } = renderHook(() => useFootprints());
    expect(result.current.isLoading).toBe(false);
  });

  it("is loading when a footprint value is NaN", () => {
    const stored = zustandAppStore.getState();
    zustandAppStore.setState({
      footprints: {
        ...stored.footprints,
        transport: {
          ...stored.footprints.transport,
          annualFootprint: NaN,
        } as unknown as typeof stored.footprints.transport,
      },
    });

    const { result } = renderHook(() => useFootprints());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.annualFootprint).toBeNaN();
  });
});
