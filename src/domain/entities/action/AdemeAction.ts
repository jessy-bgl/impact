import { Action } from "@domain/entities/action/Action";
import { AdemeEngine } from "@domain/entities/AdemeEngine";
import { NGCRule } from "@incubateur-ademe/nosgestesclimat";

export class AdemeAction extends Action {
  constructor(rule: NGCRule) {
    super({
      id: rule.dottedName!,
      label: (rule.title as string | undefined) ?? "",
      description: (rule.rawNode as any)?.description ?? "",
      category: AdemeEngine.getCategory(rule.dottedName!),
      savedFootprint: rule.nodeValue ? Math.round(rule.nodeValue as number) : 0,
    });
  }
}
