import { DottedName, NGCRule } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import PublicodesEngine, { RuleNode } from "publicodes";

export type NGCRuleNode = RuleNode & {
  rawNode: NGCRule & { "par défaut"?: string; "applicable si"?: string };
};

export type NGCRulesNodes = Record<DottedName, NGCRuleNode>;

export const ademeFootprintModel = new PublicodesEngine(AdemeModel);

// TODO: clean
// ademeFootprintModel.setSituation(
//   { "transport . voiture . km": 1000 },
//   { keepPreviousSituation: true },
// );
// ademeFootprintModel.setSituation(
//   { "transport . voiture . autopartage": 1 },
//   { keepPreviousSituation: true },
// );
// console.log(ademeFootprintModel.getRule("transport . voiture . km"));
// console.log(ademeFootprintModel.getSituation());
