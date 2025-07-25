import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { EvaluatedNode } from "publicodes";

import { Action } from "@domain/entities/action/Action";
import { AdemeEngine } from "@domain/entities/AdemeEngine";

export class AdemeAction extends Action {
  constructor(rule: NGCRuleNode & EvaluatedNode) {
    super({
      id: rule.dottedName!,
      label: (rule.title as string | undefined) ?? "",
      description: (rule.rawNode as any)?.description ?? "",
      category: AdemeEngine.getCategory(rule.dottedName as DottedName),
      savedFootprint: rule.nodeValue ? Math.round(rule.nodeValue as number) : 0,
    });
  }
}
