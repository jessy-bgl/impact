import { DottedName } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import personasData from "@incubateur-ademe/nosgestesclimat/public/personas-fr.json";

import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

const engine = new AdemeComputeEngine();

/**
 * Guard against NGC model updates adding (or removing) a sub-rule that our
 * compute*Footprint methods do not read. The NGC top-level categories are plain
 * `somme` rules, so the value the engine computes for the category must equal
 * the sum our entity exposes. Any uncovered sub-rule breaks that equality.
 */
const CATEGORY_ROOTS = {
  transport: "transport",
  food: "alimentation",
  housing: "logement",
  everydayThings: "divers",
  societalServices: "services sociétaux",
} as const satisfies Record<string, DottedName>;

/**
 * The sub-rules each compute*Footprint method reads, per category. Kept in sync
 * by hand with AdemeComputeEngine: the test below asserts it matches the NGC
 * `somme` exactly, so a model update that adds a sub-rule fails here even when
 * no persona gives that sub-rule a non-zero value.
 */
const COVERED_SUB_RULES: Record<keyof typeof CATEGORY_ROOTS, string[]> = {
  transport: [
    "voiture",
    "deux roues",
    "avion",
    "transports commun",
    "ferry",
    "train",
    "vacances",
    "mobilité douce",
  ],
  food: ["boisson", "repas", "déchets"],
  housing: [
    "construction",
    "électricité",
    "chauffage",
    "climatisation",
    "vacances",
    "piscine",
    "extérieur",
  ],
  everydayThings: [
    "animaux domestiques",
    "ameublement",
    "loisirs",
    "textile",
    "numérique",
    "tabac",
    "électroménager",
    "produits consommables",
    "autres produits",
  ],
  societalServices: ["services marchands", "services publics"],
};

const model = AdemeModel as unknown as Record<
  string,
  { formule?: { somme?: string[] } }
>;

const evaluateRule = (dottedName: DottedName): number =>
  (AdemeEngine.evaluate(dottedName).nodeValue as number) ?? 0;

describe("AdemeComputeEngine sub-rule coverage", () => {
  beforeEach(() => {
    engine.setProfile({});
  });

  it("computes every NGC top-level category", () => {
    // Without this, a sixth category added to `bilan` would be dropped from the
    // total footprint while every per-category assertion below still passes.
    expect([...(model.bilan?.formule?.somme ?? [])].sort()).toEqual(
      Object.values(CATEGORY_ROOTS).sort(),
    );
  });

  describe("every NGC sub-rule of a category is read by the engine", () => {
    // If this fails, the NGC model added/renamed/removed a sub-rule: update
    // both the matching compute*Footprint method and COVERED_SUB_RULES.
    Object.entries(CATEGORY_ROOTS).forEach(([category, root]) => {
      it(`${category} (${root})`, () => {
        const ngcSubRules = model[root]?.formule?.somme;
        // A category that is no longer a plain `somme` also invalidates the
        // value-equality assertions below.
        expect(ngcSubRules).toBeDefined();
        expect([...ngcSubRules!].sort()).toEqual(
          [
            ...COVERED_SUB_RULES[category as keyof typeof CATEGORY_ROOTS],
          ].sort(),
        );
      });
    });
  });

  describe("computed category footprint equals the NGC category value", () => {
    const profiles: [string, Profile][] = [
      ["default profile", {}],
      ...Object.entries(personasData).map(
        ([, persona]) =>
          [persona.nom, persona.situation as Profile] as [string, Profile],
      ),
    ];

    profiles.forEach(([name, profile]) => {
      describe(name, () => {
        Object.entries(CATEGORY_ROOTS).forEach(([category, root]) => {
          it(category, () => {
            engine.setProfile(profile);
            const footprints = engine.computeFootprints();
            const computed =
              footprints[category as keyof typeof footprints].annualFootprint;
            const expected = evaluateRule(root);

            // Each sub-footprint is rounded before being summed, so allow a
            // small drift. A missing sub-rule is orders of magnitude bigger.
            expect(Math.abs(computed - expected)).toBeLessThan(10);
          });
        });

        it("total", () => {
          engine.setProfile(profile);
          const computed = Object.values(engine.computeFootprints()).reduce(
            (total, footprint) => total + footprint.annualFootprint,
            0,
          );

          expect(Math.abs(computed - evaluateRule("bilan"))).toBeLessThan(50);
        });
      });
    });
  });
});
