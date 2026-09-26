import { DottedName, NGCRules } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";

import { ademeFootprintModel } from "@carbonFootprint/data/ademe-footprint-model";
import { AdemeComputeEngine } from "@carbonFootprint/domain/entities/engine/AdemeComputeEngine";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { profileSections } from "@carbonFootprint/domain/entities/profile/profileSections";
import { AdemeQuestion } from "@carbonFootprint/domain/entities/question/AdemeQuestion";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

const engine = new AdemeComputeEngine();

const model = AdemeModel as unknown as NGCRules;

const mealsKey = "alimentation . plats" as keyof Profile;
const veganKey = "alimentation . plats . végétalien" as keyof Profile;
const veganMealsKey = `${veganKey} . nombre` as keyof Profile;
const gentleMobilityKey = "transport . mobilité douce" as keyof Profile;
const bikeKey = "transport . mobilité douce . vélo . présent" as keyof Profile;
const carKmKey = "transport . voiture . km" as keyof Profile;
const carEngineKey = "transport . voiture . motorisation" as keyof Profile;
const passengersKey = "transport . voiture . voyageurs" as keyof Profile;
const inhabitantsKey = "logement . habitants" as keyof Profile;
const boatKey =
  "transport . vacances . bateau plaisance . propriétaire" as keyof Profile;
const gridConsumptionKey =
  "logement . électricité . réseau . consommation" as keyof Profile;

const carOwnerProfile: Profile = {
  "transport . voiture . utilisateur": "'propriétaire'",
};

// Applicability and default values are read from the engine situation, so the
// profile has to be pushed to it the way the app does before asking.
const getQuestion = (key: keyof Profile, profile: Profile = {}): Question => {
  engine.setProfile(profile);
  return engine.getQuestions(profile, [key])[key];
};

const getSubQuestion = (
  question: Question,
  label: keyof Profile,
): Question | undefined =>
  question.subQuestions?.find((subQuestion) => subQuestion.label === label);

describe("AdemeQuestion", () => {
  describe("type", () => {
    it.each([
      [gentleMobilityKey, "multi-select"],
      [mealsKey, "multi-number"],
      [carEngineKey, "select"],
      [carKmKey, "number"],
      [bikeKey, "select-boolean"],
    ])("types %s as %s", (key, type) => {
      expect(getQuestion(key).type).toBe(type);
    });

    // The type is cached per rule, so the first situation a question is built
    // in must not decide it: `voyageurs` (no unit, a computed default) is null
    // while the user never drives, and numeric again afterwards.
    // The fallback of `getType` reads the evaluated value, and the type is
    // cached from the first situation: it is only safe as long as every
    // question that reaches it is numeric by nature.
    it("leaves only numeric questions to the evaluation fallback", () => {
      engine.setProfile({});
      const keys = Object.values(profileSections).flatMap(
        (section) => Object.values(section.questionKeys) as (keyof Profile)[],
      );
      const withoutShape: (keyof Profile)[] = [];
      const visit = (question: Question) => {
        question.subQuestions?.forEach(visit);
        const rawNode = AdemeEngine.getRule(question.label).rawNode;
        const declaredType =
          rawNode.mosaique ||
          rawNode["une possibilité"] ||
          rawNode["unité"] !== undefined ||
          rawNode["par défaut"] === "oui" ||
          rawNode["par défaut"] === "non";
        if (!declaredType) withoutShape.push(question.label);
      };
      Object.values(engine.getQuestions({}, keys)).forEach(visit);

      // What publicodes infers from the rule itself, whatever the situation.
      const nodesTypes = (ademeFootprintModel as any).context.nodesTypes;
      for (const key of withoutShape) {
        expect([key, nodesTypes.get(AdemeEngine.getRule(key)).type]).toEqual([
          key,
          "number",
        ]);
      }
    });

    it("types a numeric question the same whether it is applicable or not", () => {
      const notDriving = getQuestion(passengersKey, {
        "transport . voiture . utilisateur": "'jamais'",
      });
      const driving = getQuestion(passengersKey, carOwnerProfile);

      expect(notDriving.type).toBe("number");
      expect(driving.type).toBe("number");
    });
  });

  describe("options", () => {
    it("offers one quoted option per declared possibility", () => {
      const carEngine = getQuestion(carEngineKey, carOwnerProfile);

      expect(carEngine.options).toEqual(
        (model[carEngineKey]?.["une possibilité"] as string[]).map(
          (option) => ({
            label: model[`${carEngineKey} . ${option}` as DottedName]?.titre,
            value: `'${option}'`,
          }),
        ),
      );
    });

    it("offers a yes/no pair for a boolean question", () => {
      expect(getQuestion(bikeKey).options).toEqual([
        { label: "Oui", value: "oui" },
        { label: "Non", value: "non" },
      ]);
    });
  });

  describe("default value", () => {
    it("prefers the profile answer over the model default", () => {
      const km = getQuestion(carKmKey, { "transport . voiture . km": 5000 });

      expect(km.defaultValue).toBe("5000");
      expect(km.isEngineDefaultValueUsed).toBe(false);
    });

    it("falls back to the model default when unanswered", () => {
      const km = getQuestion(carKmKey);

      expect(km.defaultValue).toMatch(/^\d+$/);
      expect(km.isEngineDefaultValueUsed).toBe(true);
    });

    it("rounds a fractional default to one decimal", () => {
      expect(getQuestion(inhabitantsKey).defaultValue).toMatch(/^\d+\.\d$/);
    });

    it("quotes the default of a select question", () => {
      const carEngine = getQuestion(carEngineKey, carOwnerProfile);

      expect(carEngine.defaultValue).toBe(model[carEngineKey]?.["par défaut"]);
    });
  });

  describe("applicability", () => {
    // Answering "non" sets the rule to null, which makes "est applicable" false
    // and would hide the question right after the user answered it.
    it('keeps a yes/no question applicable once answered "non"', () => {
      const bike = getQuestion(bikeKey, {
        "transport . mobilité douce . vélo . présent": "non",
      });

      expect(bike.isApplicable).toBe(true);
    });

    it("hides an inactive question", () => {
      const boat = getQuestion(boatKey);

      expect(boat.isInactive).toBe(true);
      expect(boat.isApplicable).toBe(false);
    });
  });

  describe("unit and bounds", () => {
    it("exposes the unit and bounds declared on the rule", () => {
      const km = getQuestion(carKmKey);

      expect(km.unit).toBe(model[carKmKey]?.unité);
      expect(km.minValue).toBe(model[carKmKey]?.plancher);
      expect(km.maxValue).toBe(model[carKmKey]?.plafond);
    });

    // An "estimated" consumption rule carries no unit: its "précise" sibling —
    // the same physical quantity, asked exactly — does. That rule has no
    // question of its own, so it is built outside `getQuestions`.
    it("falls back to the unit of the précise sibling rule", () => {
      engine.setProfile({});

      const consumption = new AdemeQuestion(
        {},
        gridConsumptionKey,
        AdemeEngine.getRule(gridConsumptionKey),
      );

      expect(consumption.unit).toBe(
        model[`${gridConsumptionKey} précise` as DottedName]?.unité,
      );
    });
  });

  describe("wording", () => {
    it("takes its title, note and warning from the rule", () => {
      const passengers = getQuestion(passengersKey);

      expect(passengers.title).toBe(model[passengersKey]?.question);
      expect(passengers.note).toBe(model[passengersKey]?.note);
      expect(passengers.warning).toBe(model[passengersKey]?.avertissement);
    });
  });

  describe("mosaic sub-questions", () => {
    // The answered rule is the leaf ("… . nombre"), which carries no
    // description: what tells a vegan meal from a vegetarian one is declared on
    // the parent rule, like the title.
    it("describes a sub-question with its parent rule description", () => {
      const meals = getQuestion(mealsKey);

      const vegan = getSubQuestion(meals, veganMealsKey);

      expect(vegan?.description).toBe(model[veganKey]?.description);
      expect(vegan?.description).toBeTruthy();
    });

    it("describes every sub-question of the meals question", () => {
      const meals = getQuestion(mealsKey);

      const withoutDescription = meals.subQuestions
        ?.filter((subQuestion) => !subQuestion.description)
        .map((subQuestion) => subQuestion.label);

      expect(withoutDescription).toEqual([]);
    });

    it("titles a sub-question with its parent rule title and icon", () => {
      const meals = getQuestion(mealsKey);

      const vegan = getSubQuestion(meals, veganMealsKey);

      expect(vegan?.title).toBe(
        `${model[veganKey]?.titre} ${model[veganKey]?.icônes}`,
      );
    });
  });
});
