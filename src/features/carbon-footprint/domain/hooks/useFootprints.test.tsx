import { renderHook } from "@testing-library/react-native";

import { useFootprints } from "./useFootprints";

describe("useFootprints", () => {
  it("annualFootprint est la somme des empreintes par catégorie", () => {
    const { result } = renderHook(() => useFootprints());
    const { footprints, annualFootprint } = result.current;
    const sum = Object.values(footprints).reduce(
      (acc, f) => acc + f.footprint,
      0,
    );
    expect(annualFootprint).toBe(sum);
  });

  it("la somme des parts vaut exactement 100", () => {
    const { result } = renderHook(() => useFootprints());
    const total = Object.values(result.current.footprints).reduce(
      (acc, f) => acc + f.part,
      0,
    );
    expect(total).toBe(100);
  });

  it("n'est pas en chargement avec des empreintes valides", () => {
    const { result } = renderHook(() => useFootprints());
    expect(result.current.isLoading).toBe(false);
  });
});
