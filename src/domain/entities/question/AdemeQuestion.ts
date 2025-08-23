import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";

import { AdemeEngine } from "@domain/entities/engine/AdemeEngine";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/question/Question";

export class AdemeQuestion extends Question {
  private rule: NGCRuleNode;
  private ruleKey: keyof Profile;

  constructor(
    profile: Profile,
    ruleKey: keyof Profile,
    rule: NGCRuleNode,
    title?: string,
  ) {
    super();

    this.rule = rule;
    this.ruleKey = ruleKey;

    this.label = ruleKey;
    this.type = this.getType();
    const rawNode = rule.rawNode;
    this.title = title ?? rawNode.question ?? "";
    this.description = rawNode.description;
    this.note = rawNode.note;
    this.warning = rawNode.avertissement;
    this.isApplicable = this.getIsApplicable();
    this.isInactive = rawNode.inactif === "oui";
    this.minValue = rawNode.plancher as number | undefined;
    this.maxValue = rawNode.plafond as number | undefined;
    this.options = this.getOptions();
    this.subQuestions = this.getSubQuestions(profile);
    this.defaultValue = profile[ruleKey]?.toString() ?? this.getDefaultValue();
    this.isEngineDefaultValueUsed = profile[ruleKey]?.toString() ? false : true;
  }

  private getType(): Question["type"] {
    if (this.rule.rawNode.mosaique) {
      if (this.rule.rawNode.mosaique.type === "selection")
        return "multi-select";
      return "multi-number";
    }

    if (
      (this.rule.rawNode["unité"] === undefined &&
        typeof AdemeEngine.evaluate(this.ruleKey).nodeValue !== "number") ||
      ["présent", "propriétaire"].some((key) => this.ruleKey.includes(key))
    ) {
      if (this.rule.rawNode && this.rule.rawNode["une possibilité"]) {
        return "select";
      }
      return "select-boolean";
    }

    return "number";
  }

  private getIsApplicable(): boolean {
    let isApplicable = AdemeEngine.evaluate({
      "est applicable": this.rule,
    }).nodeValue;
    if (isApplicable === undefined) isApplicable = true;
    const isActive = this.rule.rawNode.inactif !== "oui";
    return (isApplicable as boolean) && isActive;
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
        const title =
          optionParentRule.title + " " + optionParentRule.rawNode["icônes"];
        const newQuestion = new AdemeQuestion(
          profile,
          optionKey,
          optionRule,
          title,
        );
        subQuestions.push(newQuestion);
      } catch {
        // ignore unknown questions
      }
    }
    return subQuestions;
  }

  private getDefaultValue(): string {
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
