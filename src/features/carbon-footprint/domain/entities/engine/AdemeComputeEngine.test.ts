import { DottedName } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import personasData from "@incubateur-ademe/nosgestesclimat/public/personas-fr.json";

import {
  ademeCategoryRoots,
  ademeCategoryRules,
} from "@carbonFootprint/domain/entities/engine/ademeCategoryRules";
import {
  AdemeComputeEngine,
  ademeFrenchAverageRule,
} from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/types";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

const engine = new AdemeComputeEngine();

const profiles: [string, Profile][] = [
  // The fresh install: no answer at all, so the model's own defaults apply.
  ["default profile", {}],
  // One ADEME persona ships an empty situation — it is the default profile
  // under another name, already covered above.
  ...Object.values(personasData)
    .filter((persona) => Object.keys(persona.situation).length > 0)
    .map(
      (persona) =>
        [persona.nom, persona.situation as Profile] as [string, Profile],
    ),
];

const categories = Object.keys(ademeCategoryRoots) as FootprintCategory[];

/**
 * The sub-rules the engine actually reads for a category, relative to its NGC
 * root — derived from `ademeCategoryRules` so there is nothing to keep in sync
 * by hand. The NGC categories are plain `somme` rules, so this must match the
 * `somme` exactly: an uncovered sub-rule is silently dropped from the total
 * footprint, even when no persona gives it a non-zero value.
 */
const coveredSubRules = (category: FootprintCategory): string[] =>
  Object.values(ademeCategoryRules[category])
    .flat()
    .map((dottedName) =>
      dottedName.slice(`${ademeCategoryRoots[category]} . `.length),
    );

const model = AdemeModel as unknown as Record<
  string,
  { formule?: { somme?: string[] } }
>;

const evaluateRule = (dottedName: DottedName): number =>
  (AdemeEngine.evaluate(dottedName).nodeValue as number) ?? 0;

type CoherenceCase = {
  name: string;
  key: string;
  low: string | number;
  high: string | number;
  otherAnswers?: Profile;
  compute: () => number;
};

describe("AdemeComputeEngine", () => {
  // Each setProfile call replaces the full situation, so tests are isolated by default.
  // The beforeEach ensures a clean state even if a test throws mid-way.
  beforeEach(() => {
    engine.setProfile({});
  });

  // The reason `ademe-model-patch` exists: a yes/no question the model gives
  // no default for renders with neither option selected, and leaves its
  // follow-ups visible. Walking every section catches the case wherever an
  // ADEME release introduces it.
  it("gives every yes/no question a selected option", () => {
    const questionKeys = Object.values(profileSections).flatMap(
      (section) => Object.values(section.questionKeys) as (keyof Profile)[],
    );

    const withoutValue: (keyof Profile)[] = [];
    const visit = (question: Question) => {
      if (!question?.isApplicable || question.isInactive) return;
      if (question.subQuestions) {
        question.subQuestions.forEach(visit);
        return;
      }
      if (question.type === "select-boolean" && !question.defaultValue)
        withoutValue.push(question.label);
    };
    Object.values(engine.getQuestions({}, questionKeys)).forEach(visit);

    expect(withoutValue).toEqual([]);
  });

  describe("directional coherence", () => {
    it.each<CoherenceCase>([
      {
        name: "driving more km increases the transport footprint",
        key: "transport . voiture . km",
        low: 0,
        high: 30000,
        otherAnswers: {
          "transport . voiture . utilisateur": "'propriétaire'",
        } as Profile,
        compute: () => engine.computeTransportFootprint().annualFootprint,
      },
      {
        name: "flying more frequently increases the transport footprint",
        key: "transport . avion . usager",
        low: "'jamais'",
        high: "'fréquemment'",
        compute: () => engine.computeTransportFootprint().annualFootprint,
      },
      {
        name: "eating more red meat increases the food footprint",
        key: "alimentation . plats . viande rouge . nombre",
        low: 0,
        high: 7,
        compute: () => engine.computeFoodFootprint().annualFootprint,
      },
      {
        name: "a larger home surface increases the housing footprint",
        key: "logement . surface",
        low: 20,
        high: 150,
        compute: () => engine.computeHousingFootprint().annualFootprint,
      },
      {
        name: "more hours per day on the internet increases the everydayThings footprint",
        key: "divers . numérique . internet . durée journalière",
        low: 0,
        high: 10,
        compute: () => engine.computeEverydayThingsFootprint().annualFootprint,
      },
    ])("$name", ({ key, low, high, otherAnswers, compute }) => {
      engine.setProfile({ ...otherAnswers, [key]: low } as Profile);
      const lowFootprint = compute();

      engine.setProfile({ ...otherAnswers, [key]: high } as Profile);

      expect(compute()).toBeGreaterThan(lowFootprint);
    });
  });

  describe("footprint regression snapshots", () => {
    // Snapshots are stored in __snapshots__/AdemeComputeEngine.test.ts.snap.
    // Run `npm test -- --updateSnapshot` after a model update to refresh them.
    it.each(profiles)("%s", (_, profile) => {
      engine.setProfile(profile);
      expect({
        transport: engine.computeTransportFootprint().annualFootprint,
        food: engine.computeFoodFootprint().annualFootprint,
        housing: engine.computeHousingFootprint().annualFootprint,
        everydayThings: engine.computeEverydayThingsFootprint().annualFootprint,
        societalServices:
          engine.computeSocietalServicesFootprint().annualFootprint,
      }).toMatchSnapshot();
    });
  });

  describe("NGC sub-rule coverage", () => {
    it("computes every NGC top-level category", () => {
      // Without this, a sixth category added to `bilan` would be dropped from the
      // total footprint while every per-category assertion below still passes.
      expect([...(model.bilan?.formule?.somme ?? [])].sort()).toEqual(
        Object.values(ademeCategoryRoots).sort(),
      );
    });

    // If this fails, the NGC model added/renamed/removed a sub-rule: update the
    // matching compute*Footprint method and `ademeCategoryRules`.
    it.each(categories)("reads every NGC sub-rule of %s", (category) => {
      const ngcSubRules = model[ademeCategoryRoots[category]]?.formule?.somme;
      // A category that is no longer a plain `somme` also invalidates the
      // value-equality assertions below.
      expect(ngcSubRules).toBeDefined();
      expect([...ngcSubRules!].sort()).toEqual(
        coveredSubRules(category).sort(),
      );
    });

    it.each(categories)(
      "%s footprint equals the NGC category value",
      (category) => {
        const computed = engine.computeFootprints()[category].annualFootprint;
        const expected = evaluateRule(ademeCategoryRoots[category]);

        // Each sub-footprint is rounded before being summed, so allow a small
        // drift. A missing sub-rule is orders of magnitude bigger.
        expect(Math.abs(computed - expected)).toBeLessThan(10);
      },
    );

    it("total footprint equals the NGC `bilan` value", () => {
      const computed = Object.values(engine.computeFootprints()).reduce(
        (total, footprint) => total + footprint.annualFootprint,
        0,
      );

      expect(Math.abs(computed - evaluateRule("bilan"))).toBeLessThan(50);
    });
  });

  describe("French average footprint", () => {
    it("equals the sum of the NGC sub-rules of its root", () => {
      // The guard that makes reading the root safe: a third term added by NGC
      // is still covered, a renamed or removed root fails loudly.
      const subRules = (model[ademeFrenchAverageRule]?.formule?.somme ??
        []) as DottedName[];
      expect(subRules.length).toBeGreaterThan(0);

      const expected = subRules.reduce(
        (total, rule) => total + evaluateRule(rule),
        0,
      );

      expect(
        Math.abs(engine.computeFrenchAverageFootprint() - expected),
      ).toBeLessThan(1);
    });

    it("matches its regression snapshot", () => {
      expect(engine.computeFrenchAverageFootprint()).toMatchSnapshot();
    });
  });
});
