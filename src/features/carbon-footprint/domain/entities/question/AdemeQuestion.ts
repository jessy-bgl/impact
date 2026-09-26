import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { PublicodesExpression } from "publicodes";

import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

type Overrides = {
  title?: string;
  description?: string;
  /**
   * A mosaic option is never evaluated on its own: it is shown with its
   * parent, whose applicability it takes. The screens filter the options on
   * `isInactive` only.
   */
  isApplicable?: boolean;
};

type SubQuestionSpec = {
  key: keyof Profile;
  rule: NGCRuleNode;
  overrides: Overrides;
};

/**
 * What a question reads from its rule only: it never changes between two
 * profiles, so it is computed once per rule and shared by every instance.
 */
type StaticData = Pick<
  Question,
  | "type"
  | "title"
  | "description"
  | "note"
  | "warning"
  | "isInactive"
  | "minValue"
  | "maxValue"
  | "unit"
  | "options"
> & { subQuestionSpecs?: SubQuestionSpec[] };

export class AdemeQuestion extends Question {
  private static staticDataByKey = new Map<keyof Profile, StaticData>();

  private rule: NGCRuleNode;
  private ruleKey: keyof Profile;

  constructor(
    profile: Profile,
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
    overrides?: Overrides,
  ) {
    super();

    this.rule = rule;
    this.ruleKey = ruleKey;
    this.label = ruleKey;

    const { subQuestionSpecs, ...staticData } = AdemeQuestion.getStaticData(
      ruleKey,
      rule,
    );
    Object.assign(this, staticData);
    this.title = overrides?.title ?? staticData.title;
    this.description = staticData.description ?? overrides?.description;

    // Only what depends on the situation is evaluated per instance.
    this.isApplicable =
      (overrides?.isApplicable ?? this.getIsApplicable()) && !this.isInactive;
    this.subQuestions = subQuestionSpecs?.map(
      (spec) =>
        new AdemeQuestion(profile, spec.key, spec.rule, {
          ...spec.overrides,
          isApplicable: this.isApplicable,
        }),
    );
    const answer = profile[ruleKey]?.toString();
    this.defaultValue = answer ?? this.getDefaultValue();
    this.isEngineDefaultValueUsed = !answer;
  }

  private static getStaticData(
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
  ): StaticData {
    let staticData = AdemeQuestion.staticDataByKey.get(ruleKey);
    if (!staticData) {
      staticData = AdemeQuestion.computeStaticData(ruleKey, rule);
      AdemeQuestion.staticDataByKey.set(ruleKey, staticData);
    }
    return staticData;
  }

  private static computeStaticData(
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
  ): StaticData {
    const rawNode = rule.rawNode;
    const type = AdemeQuestion.getType(ruleKey, rule);
    return {
      type,
      title: rawNode.question ?? "",
      description: rawNode.description,
      note: rawNode.note,
      warning: rawNode.avertissement,
      isInactive: rawNode.inactif === "oui",
      minValue: rawNode.plancher as number | undefined,
      maxValue: rawNode.plafond as number | undefined,
      unit: AdemeQuestion.getUnit(ruleKey, rule),
      options: AdemeQuestion.getOptions(ruleKey, rule, type),
      subQuestionSpecs: AdemeQuestion.getSubQuestionSpecs(ruleKey, rule, type),
    };
  }

  private static getType(
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
  ): Question["type"] {
    const rawNode = rule.rawNode;

    if (rawNode.mosaique) {
      return rawNode.mosaique.type === "selection"
        ? "multi-select"
        : "multi-number";
    }

    if (rawNode["une possibilité"]) {
      return "select";
    }

    if (rawNode["unité"] !== undefined) return "number";

    const defaultValue = rawNode["par défaut"];
    if (defaultValue === "oui" || defaultValue === "non")
      return "select-boolean";

    // Cached per rule: the value read here must not depend on the situation.
    // A yes/no question always declares a literal default (`ademe-model-patch`
    // guarantees it), so a rule that evaluates to null because it is not
    // applicable right now can only be numeric.
    const nodeValue = AdemeEngine.evaluateRule(rule).nodeValue;
    return typeof nodeValue === "boolean" ? "select-boolean" : "number";
  }

  private static getUnit(
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
  ): string | undefined {
    const unit = rule.rawNode["unité"];
    if (unit) return unit;

    // Some "estimated" consumption rules don't carry the unit themselves,
    // but their "précise" sibling (same physical quantity) does.
    const preciseKey = `${ruleKey} précise` as keyof Profile;
    if (!AdemeEngine.containsKey(preciseKey)) return undefined;
    return AdemeEngine.getRule(preciseKey).rawNode["unité"];
  }

  private static getOptions(
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
    type: Question["type"],
  ): Question["options"] | undefined {
    if (type === "select") {
      const possibilities = rule.rawNode["une possibilité"] as
        string[] | undefined;
      if (possibilities === undefined) return undefined;
      return possibilities.map((option: string) => {
        const optionKey = (ruleKey + " . " + option) as DottedName;
        const optionValue = option.startsWith("'") ? option : `'${option}'`;
        return {
          label: AdemeEngine.getRule(optionKey).title,
          value: optionValue,
        };
      });
    }
    if (type === "select-boolean") {
      return [
        { label: "Oui", value: "oui" },
        { label: "Non", value: "non" },
      ];
    }
    return undefined;
  }

  private static getSubQuestionSpecs(
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
    type: Question["type"],
  ): SubQuestionSpec[] | undefined {
    if (type !== "multi-select" && type !== "multi-number") return undefined;
    const options: string[] = rule.rawNode.mosaique?.options as string[];
    const specs: SubQuestionSpec[] = [];
    for (const option of options) {
      let optionKey = `${ruleKey} . ${option}` as keyof Profile;
      if (!AdemeEngine.containsKey(optionKey))
        optionKey =
          `${AdemeQuestion.removeLastPartOfKey(ruleKey)} . ${option}` as keyof Profile;
      if (!AdemeEngine.containsKey(optionKey)) continue; // ignore unknown questions
      const optionRule = AdemeEngine.getRule(optionKey);
      const optionParentKey = AdemeQuestion.removeLastPartOfKey(optionKey);
      if (!AdemeEngine.containsKey(optionParentKey)) continue;
      const optionParentRule = AdemeEngine.getRule(optionParentKey);
      const icon = optionParentRule.rawNode["icônes"];
      const title = icon
        ? `${optionParentRule.title} ${icon}`
        : optionParentRule.title;
      // A mosaic option answers on its leaf rule ("… . nombre", "… . présent"),
      // which carries no description: the explanation of what the option covers
      // ("Repas sans produits animaux.") lives on its parent, like the title.
      specs.push({
        key: optionKey,
        rule: optionRule,
        overrides: { title, description: optionParentRule.rawNode.description },
      });
    }
    return specs;
  }

  private getIsApplicable(): boolean {
    // Unknown applicability keeps the question visible.
    if (this.type !== "select-boolean")
      return AdemeEngine.isRuleApplicable(this.rule) ?? true;

    // Publicodes treats a "oui / non" rule as an applicability flag: answering
    // "non" sets its value to null, which makes "est applicable" false and would
    // hide the question right after the user answered it. Neutralizing the
    // answer to "oui" keeps only the parent chain as the display condition.
    const expression: PublicodesExpression = {
      "est applicable": {
        valeur: this.ruleKey,
        contexte: { [this.ruleKey]: "oui" },
      },
    };
    const isApplicable = AdemeEngine.evaluate(expression).nodeValue;
    return isApplicable === undefined || (isApplicable as boolean);
  }

  private getDefaultValue(): string {
    // Evaluating `par défaut` on a yes/no rule defaulting to "non" returns null,
    // not false: "non" makes the rule itself non applicable. Reading the literal
    // keeps the option selected in the UI — and skips an evaluation.
    if (this.type === "select-boolean") {
      const declaredDefault = this.rule.rawNode["par défaut"];
      if (declaredDefault === "oui" || declaredDefault === "non")
        return declaredDefault;
    }

    // Unanswered, the rule evaluates to its `par défaut`.
    let defaultValue = AdemeEngine.evaluateRule(this.rule).nodeValue;

    if (defaultValue === undefined || defaultValue === null) return "";

    if (this.type === "number") {
      return typeof defaultValue === "number"
        ? this.formatNumberValue(defaultValue)
        : "0";
    }

    defaultValue = defaultValue.toString();

    if (this.type === "select" || this.type === "select-boolean")
      return this.formatSelectValue(defaultValue);

    return defaultValue;
  }

  private formatNumberValue(value: number): string {
    return value % 1 !== 0 ? value.toFixed(1) : value.toString();
  }

  private formatSelectValue(value: string): string {
    if (value === "true") return "oui";
    if (value === "false") return "non";
    return value.startsWith("'") ? value : `'${value}'`;
  }

  private static removeLastPartOfKey(key: string): keyof Profile {
    return key.slice(0, key.lastIndexOf(" . ")) as keyof Profile;
  }
}
