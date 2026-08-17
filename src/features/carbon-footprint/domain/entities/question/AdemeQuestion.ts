import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { PublicodesExpression } from "publicodes";

import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

export class AdemeQuestion extends Question {
  private rule: NGCRuleNode;
  private ruleKey: keyof Profile;

  constructor(
    profile: Profile,
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
    overrides?: { title?: string; description?: string },
  ) {
    super();

    this.rule = rule;
    this.ruleKey = ruleKey;

    this.label = ruleKey;
    this.type = this.getType();
    const rawNode = rule.rawNode;
    this.title = overrides?.title ?? rawNode.question ?? "";
    this.description = rawNode.description ?? overrides?.description;
    this.note = rawNode.note;
    this.warning = rawNode.avertissement;
    this.isApplicable = this.getIsApplicable();
    this.isInactive = rawNode.inactif === "oui";
    this.minValue = rawNode.plancher as number | undefined;
    this.maxValue = rawNode.plafond as number | undefined;
    this.unit = this.getUnit();
    this.options = this.getOptions();
    this.subQuestions = this.getSubQuestions(profile);
    this.defaultValue = profile[ruleKey]?.toString() ?? this.getDefaultValue();
    this.isEngineDefaultValueUsed = profile[ruleKey]?.toString() ? false : true;
  }

  private getType(): Question["type"] {
    const rawNode = this.rule.rawNode;

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

    const nodeValue = AdemeEngine.evaluate(this.ruleKey).nodeValue;
    return typeof nodeValue !== "number" ? "select-boolean" : "number";
  }

  private getUnit(): string | undefined {
    const unit = this.rule.rawNode["unité"];
    if (unit) return unit;

    // Some "estimated" consumption rules don't carry the unit themselves,
    // but their "précise" sibling (same physical quantity) does.
    try {
      return AdemeEngine.getRule(`${this.ruleKey} précise` as keyof Profile)
        .rawNode["unité"];
    } catch {
      return undefined;
    }
  }

  private getIsApplicable(): boolean {
    let isApplicable = AdemeEngine.evaluate(
      this.getApplicabilityExpression(),
    ).nodeValue;
    if (isApplicable === undefined) isApplicable = true;
    const isActive = this.rule.rawNode.inactif !== "oui";
    return (isApplicable as boolean) && isActive;
  }

  // Publicodes treats a "oui / non" rule as an applicability flag: answering
  // "non" sets its value to null, which makes "est applicable" false and would
  // hide the question right after the user answered it. Neutralizing the
  // answer to "oui" keeps only the parent chain as the display condition.
  private getApplicabilityExpression(): PublicodesExpression {
    if (this.type !== "select-boolean") return { "est applicable": this.rule };
    return {
      "est applicable": {
        valeur: this.ruleKey,
        contexte: { [this.ruleKey]: "oui" },
      },
    };
  }

  private getOptions(): Question["options"] | undefined {
    if (this.type === "select") {
      if (this.rule.rawNode["une possibilité"] === undefined) return undefined;
      return (this.rule.rawNode["une possibilité"] as string[]).map(
        (option: string) => {
          const optionKey = (this.ruleKey + " . " + option) as DottedName;
          const optionValue = option.startsWith("'") ? option : `'${option}'`;
          return {
            label: AdemeEngine.getRule(optionKey).title,
            value: optionValue,
          };
        },
      );
    }
    if (this.type === "select-boolean") {
      return [
        { label: "Oui", value: "oui" },
        { label: "Non", value: "non" },
      ];
    }
    return undefined;
  }

  private getSubQuestions(profile: Profile): Question[] | undefined {
    if (this.type !== "multi-select" && this.type !== "multi-number")
      return undefined;
    const options: string[] = this.rule.rawNode.mosaique?.options as string[];
    const subQuestions: Question[] = [];
    for (const option of options) {
      try {
        let optionKey = `${this.ruleKey} . ${option}` as keyof Profile;
        if (!AdemeEngine.containsKey(optionKey))
          optionKey =
            `${this.removeLastPartOfKey(this.ruleKey)} . ${option}` as keyof Profile;
        const optionRule = AdemeEngine.getRule(optionKey);
        const optionParentKey = this.removeLastPartOfKey(optionKey);
        const optionParentRule = AdemeEngine.getRule(optionParentKey);
        const icon = optionParentRule.rawNode["icônes"];
        const title = icon
          ? `${optionParentRule.title} ${icon}`
          : optionParentRule.title;
        // A mosaic option answers on its leaf rule ("… . nombre", "… . présent"),
        // which carries no description: the explanation of what the option covers
        // ("Repas sans produits animaux.") lives on its parent, like the title.
        const newQuestion = new AdemeQuestion(profile, optionKey, optionRule, {
          title,
          description: optionParentRule.rawNode.description,
        });
        subQuestions.push(newQuestion);
      } catch {
        // ignore unknown questions
      }
    }
    return subQuestions;
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

    let defaultValue = AdemeEngine.evaluate({
      "par défaut": this.rule,
    }).nodeValue;

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

  private removeLastPartOfKey(key: string): keyof Profile {
    return key.slice(0, key.lastIndexOf(" . ")) as keyof Profile;
  }
}
