import { NGCRuleNode, NGCRules } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import PublicodesEngine from "publicodes";

export const ademeFootprintModel = new PublicodesEngine(
  AdemeModel as unknown as NGCRules,
  {
    strict: {
      situation: false,
      noOrphanRule: true,
      checkPossibleValues: false,
      noCycleRuntime: false,
    },
    warn: {
      cyclicReferences: false,
    },
  },
);

export type NGCRulesNodes = Record<string, NGCRuleNode>;
