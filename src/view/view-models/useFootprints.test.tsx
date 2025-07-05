import { renderHook } from "@testing-library/react-native";

import { useFootprints } from "../view-models/useFootprints";

describe("useFootprints", () => {
  it("returns the correct annual and category footprints", () => {
    const { result } = renderHook(() => useFootprints());

    // These values are calculated by the real AdemeFootprintEngine
    expect(result.current.annualFootprint).toBe(7962);
    expect(result.current.footprints.transport.footprint).toBe(1959);
    expect(result.current.footprints.food.footprint).toBe(2339);
    expect(result.current.footprints.housing.footprint).toBe(2161);
    expect(result.current.footprints.everydayThings.footprint).toBe(53);
    expect(result.current.footprints.societalServices.footprint).toBe(1450);
  });
});
