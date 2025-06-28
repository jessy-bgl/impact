import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { EvaluatedNode, PublicodesExpression } from "publicodes";

import {
  ademeFootprintModel,
  NGCRulesNodes,
} from "@data/ademe-footprint-model";
import { FootprintCategory } from "@domain/entities/footprints/types";
import { Profile } from "@domain/entities/profile/Profile";

export abstract class AdemeEngine {
  public static getSituation = (): Profile => {
    try {
      return ademeFootprintModel.getSituation();
    } catch (e) {
      console.error(e);
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
    }
  };

  public static evaluate = (rule: PublicodesExpression): EvaluatedNode => {
    try {
      return ademeFootprintModel.evaluate(rule);
    } catch (e) {
      console.error(e);
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
    const splittedRule = key.split(" . ");
    const categoryString = splittedRule.length < 1 ? key : splittedRule[0];
    if (categoryString === "transport") return "transport";
    if (categoryString === "alimentation") return "food";
    if (categoryString === "logement") return "housing";
    if (categoryString === "divers") return "everydayThings";
    if (categoryString === "services sociétaux") return "societalServices";
    throw new Error(`Unknown category for dottedName ${key}`);
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
