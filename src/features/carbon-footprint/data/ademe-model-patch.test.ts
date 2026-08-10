import { DottedName, NGCRules } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import PublicodesEngine from "publicodes";

import {
  applyDefaultBooleanAnswers,
  findBooleanQuestionsWithoutDefault,
} from "@carbonFootprint/data/ademe-model-patch";

const rules = AdemeModel as unknown as NGCRules;

// The overlay is the app's deliberate divergence from the published ADEME model.
// These tests are what makes `npm update @incubateur-ademe/nosgestesclimat` safe:
// a release that adds, drops or renames a yes/no question fails CI with the exact
// diff instead of silently changing what the app defaults to.
describe("applyDefaultBooleanAnswers", () => {
  const dottedNames = findBooleanQuestionsWithoutDefault(rules);

  it("patches exactly the questions the ADEME model leaves without a default", () => {
    expect([...dottedNames].sort()).toMatchSnapshot();
  });

  it("declares 'non' on every one of them, and only on them", () => {
    const patched = applyDefaultBooleanAnswers(rules);
    const engine = new PublicodesEngine(patched);
    const parsedRules = engine.getParsedRules();

    const declaredDefaults = dottedNames.map(
      (dottedName) => parsedRules[dottedName].rawNode["par défaut"],
    );

    expect(declaredDefaults).toEqual(dottedNames.map(() => "non"));
    expect(findBooleanQuestionsWithoutDefault(patched)).toEqual([]);
  });

  it("leaves the ADEME package untouched", () => {
    const before = JSON.stringify(rules);

    applyDefaultBooleanAnswers(rules);

    expect(JSON.stringify(rules)).toBe(before);
  });

  // Some options — `logement . chauffage . appoint`'s for instance — are defined
  // inside an ancestor's `avec` block. Re-declaring one at the top level makes
  // Publicodes throw at parse time, so the overlay has to patch it in place.
  it("patches the rules nested in an `avec` block where they are defined", () => {
    const nestedDottedName =
      "logement . chauffage . appoint . bois . présent" as DottedName;
    expect(dottedNames).toContain(nestedDottedName);
    expect(rules[nestedDottedName]).toBeUndefined();

    const patched = applyDefaultBooleanAnswers(rules);

    expect(patched[nestedDottedName]).toBeUndefined();
    expect(() => new PublicodesEngine(patched)).not.toThrow();
  });

  it("throws rather than skipping a rule it cannot resolve", () => {
    const orphanRules = {
      "transport . deux roues . usager": { question: "stub question" },
    } as unknown as NGCRules;
    const resolvable = { ...orphanRules };
    delete (resolvable as Record<string, unknown>)[
      "transport . deux roues . usager"
    ];

    // Same shape, but the rule the walk found is gone from the copy it patches
    jest
      .spyOn(globalThis, "structuredClone")
      .mockReturnValueOnce(resolvable as unknown as NGCRules);

    expect(() => applyDefaultBooleanAnswers(orphanRules)).toThrow(
      'no rule found at "transport . deux roues . usager"',
    );
  });
});
