import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { EvaluatedNode, PublicodesExpression } from "publicodes";

import {
  ademeFootprintModel,
  NGCRulesNodes,
} from "@carbonFootprint/data/ademe-footprint-model";
import { ademeCategoryRoots } from "@carbonFootprint/domain/entities/engine/ademeCategoryRules";
import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/types";
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

  public static setSituation = (
    profile: Profile,
    keepPreviousSituation = false,
  ): void => {
    try {
      ademeFootprintModel.setSituation(profile, {
        strict: true,
        keepPreviousSituation,
      });
    } catch (e) {
      console.error(e);
      posthog.captureException(new Error("ademe_engine_set_situation_failed"));
    }
  };

  public static evaluate = (rule: PublicodesExpression): EvaluatedNode => {
    try {
      return ademeFootprintModel.evaluate(rule);
    } catch (e) {
      console.error(e);
      posthog.captureException(
        new Error("ademe_engine_evaluation_failed"),
        typeof rule === "string" ? { rule } : {},
      );
      return {} as EvaluatedNode;
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

  public static getIsApplicable(key: DottedName) {
    return (
      ademeFootprintModel.evaluate({ "est applicable": key })?.nodeValue ===
      true
    );
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
}
