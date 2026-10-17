import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";

import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { legacyActionIds } from "@carbonFootprint/domain/entities/action/legacyActions";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";

export class AdemeAction extends Action {
  constructor(rule: NGCRuleNode, savedFootprint: number) {
    const dottedName = rule.dottedName as DottedName;
    super({
      id: AdemeEngine.getActionId(rule)!,
      label: rule.title ?? "",
      category: AdemeEngine.getActionCategory(dottedName),
      savedFootprint: Math.round(savedFootprint),
      legacyId: legacyActionIds[dottedName],
    });
  }
}
