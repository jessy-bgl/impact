import { DottedName, NGCRule } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import PublicodesEngine, { RuleNode } from "publicodes";

export const ademeFootprintModel = new PublicodesEngine(AdemeModel);

export type NGCRuleNode = RuleNode & {
  rawNode: NGCRule & {
    "par défaut"?: string | number;
    "applicable si"?: string;
    formule?: any; // string or object
  };
};

export type NGCRulesNodes = Record<DottedName, NGCRuleNode>;
