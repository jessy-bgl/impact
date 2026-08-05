import { resolveUnitAffix } from "@carbonFootprint/view/screens/profile/components/forms/fields/resolveUnitAffix";
import i18n from "@common/translations/i18n";

const t = i18n.t.bind(i18n);

describe("resolveUnitAffix", () => {
  it("returns undefined when the question has no unit", () => {
    expect(resolveUnitAffix(t, undefined)).toBeUndefined();
  });

  it("translates a unit listed in the units map", () => {
    expect(resolveUnitAffix(t, "m2")).toBe("m²");
    expect(resolveUnitAffix(t, "l/semaine")).toBe("litre(s)");
  });

  it("translates the units of the meals and hot drinks questions", () => {
    expect(resolveUnitAffix(t, "repas/semaine")).toBe("repas");
    expect(resolveUnitAffix(t, "tasse/jour")).toBe("tasse(s)");
  });

  it("drops the time period of an unlisted compound unit", () => {
    expect(resolveUnitAffix(t, "bol/semaine")).toBe("bol");
    expect(resolveUnitAffix(t, "trajet/an")).toBe("trajet");
  });

  it("translates the numerator of an unlisted compound unit", () => {
    expect(resolveUnitAffix(t, "nuit/mois")).toBe("nuit(s)");
  });

  it("keeps a compound unit whose denominator is not a time period", () => {
    expect(resolveUnitAffix(t, "kgCO2e/repas")).toBe("kgCO2e/repas");
  });

  it("prefers the units map over the time period fallback", () => {
    expect(resolveUnitAffix(t, "h/jour")).toBe("h");
    expect(resolveUnitAffix(t, "h/semaine")).toBe("h");
  });

  it("keeps an unknown simple unit as is", () => {
    expect(resolveUnitAffix(t, "spectacle")).toBe("spectacle");
  });
});
