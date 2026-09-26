import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { ASTNode, EvaluatedNode, PublicodesExpression } from "publicodes";

import {
  ademeFootprintModel,
  NGCRulesNodes,
} from "@carbonFootprint/data/ademe-footprint-model";
import { ademeCategoryRoots } from "@carbonFootprint/domain/entities/engine/ademeCategoryRules";
import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/Footprints";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { posthog } from "@common/config/posthog";

export abstract class AdemeEngine {
  public static getSituation = (): Profile => {
    try {
      return ademeFootprintModel.getSituation();
    } catch (e) {
      console.error(e);
      // Never forward the raw Publicodes error: it can embed the user's
      // footprint answers in its message. See docs/gdpr-compliance.md §3.
      posthog.captureException(new Error("ademe_engine_get_situation_failed"));
      return {};
    }
  };

  /**
   * Replaces the whole situation with the profile.
   *
   * @returns false when the engine rejected it and kept the previous one
   */
  public static setSituation = (profile: Profile): boolean => {
    // A key without a value (an answer a migration removed) is no answer: the
    // strict mode would reject the whole situation for that unknown key.
    const situation = Object.fromEntries(
      Object.entries(profile).filter(([, value]) => value !== undefined),
    );
    try {
      ademeFootprintModel.setSituation(situation, { strict: true });
      return true;
    } catch (e) {
      console.error(e);
      posthog.captureException(new Error("ademe_engine_set_situation_failed"));
      return false;
    }
  };

  public static evaluate = (rule: PublicodesExpression): EvaluatedNode => {
    try {
      return ademeFootprintModel.evaluate(rule);
    } catch (e) {
      this.reportEvaluationError(
        e,
        typeof rule === "string" ? rule : undefined,
      );
      return {} as EvaluatedNode;
    }
  };

  /**
   * Evaluates an already parsed rule.
   *
   * `evaluate()` re-parses its expression on every call, and registering that
   * expression makes publicodes copy its ~3000 parsed rules: about 1 ms per
   * call, more than most evaluations themselves. A rule node is already
   * parsed, so it goes straight to the evaluation. `evaluateNode` is flagged
   * internal by publicodes but is the entry point `evaluate` itself ends in.
   */
  public static evaluateRule = (rule: NGCRuleNode): EvaluatedNode => {
    try {
      return ademeFootprintModel.evaluateNode(rule);
    } catch (e) {
      this.reportEvaluationError(e, rule.dottedName);
      return {} as EvaluatedNode;
    }
  };

  /** `evaluateRule` for a name that may not exist in the model anymore. */
  public static evaluateRuleByName = (
    dottedName: DottedName,
  ): EvaluatedNode => {
    const rule = this.findRule(dottedName);
    return rule ? this.evaluateRule(rule) : ({} as EvaluatedNode);
  };

  /**
   * Same as evaluating `est applicable` on the rule, without the parsing.
   *
   * `undefined` when the engine cannot tell (missing variables, evaluation
   * error): callers decide what an unknown applicability means to them.
   */
  public static isRuleApplicable = (rule: NGCRuleNode): boolean | undefined => {
    try {
      const node: ASTNode<"est non applicable"> = {
        nodeKind: "est non applicable",
        explanation: rule,
      };
      const isNotApplicable = ademeFootprintModel.evaluateNode(node).nodeValue;
      if (typeof isNotApplicable !== "boolean") return undefined;
      return !isNotApplicable;
    } catch (e) {
      this.reportEvaluationError(e, rule.dottedName);
      return undefined;
    }
  };

  public static containsKey = (key: keyof Profile): boolean => {
    try {
      this.getRule(key);
      return true;
    } catch {
      return false;
    }
  };

  public static getRule = (rule: keyof Profile): NGCRuleNode => {
    return ademeFootprintModel.getRule(rule);
  };

  public static getRules = (): NGCRulesNodes => {
    return ademeFootprintModel.getParsedRules();
  };

  public static getCategory(key: DottedName): FootprintCategory {
    const root = key.split(" . ")[0];
    const category = (
      Object.entries(ademeCategoryRoots) as [FootprintCategory, DottedName][]
    ).find(([, categoryRoot]) => categoryRoot === root)?.[0];
    if (!category) throw new Error(`Unknown category for dottedName ${key}`);
    return category;
  }

  public static getIsApplicable(key: DottedName): boolean {
    const rule = this.findRule(key);
    return rule !== undefined && this.isRuleApplicable(rule) === true;
  }

  public static getIsDisabled(
    flatRule: { formule?: string },
    nodeValue?: number | boolean,
  ) {
    return flatRule?.formule === null
      ? false
      : nodeValue === 0 || nodeValue === false || nodeValue === null;
  }

  public static getNumericValue({
    nodeValue,
    unit,
  }: EvaluatedNode): number | undefined {
    if (typeof nodeValue !== "number") return undefined;
    const result = unit?.numerators.includes("%") ? nodeValue / 100 : nodeValue;
    return result;
  }

  private static findRule = (
    dottedName: DottedName,
  ): NGCRuleNode | undefined => {
    if (this.containsKey(dottedName)) return this.getRule(dottedName);
    // A name the app hard-codes that the model no longer declares: nothing
    // was evaluated, the engine state is intact.
    posthog.captureException(new Error("ademe_engine_unknown_rule"), {
      rule: dottedName,
    });
    return undefined;
  };

  private static reportEvaluationError = (error: unknown, rule?: string) => {
    console.error(error);
    posthog.captureException(
      new Error("ademe_engine_evaluation_failed"),
      rule ? { rule } : {},
    );
    // An evaluation that throws leaves its rule on the engine's internal
    // evaluation stacks, which then corrupts the next evaluations (phantom
    // cycles, skipped parent checks). Dropping the cache empties them.
    ademeFootprintModel.resetCache();
  };
}
