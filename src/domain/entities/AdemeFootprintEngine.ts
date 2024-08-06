import { DottedName } from "@incubateur-ademe/nosgestesclimat";

import {
  ademeFootprintModel,
  NGCRuleNode,
  NGCRulesNodes,
} from "@data/ademe-footprint-model";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { Profile } from "@domain/entities/profile/Profile";

export class AdemeFootprintEngine {
  public model = ademeFootprintModel;

  constructor(profile: Profile) {
    const currentSituation = this.model.getSituation();
    try {
      this.model.setSituation(
        { ...currentSituation, ...profile },
        { strict: true },
      );
    } catch (e) {
      console.log(e);
    }
  }

  public getQuestionRules = (): NGCRulesNodes => {
    const parsedRules = this.model.getParsedRules();
    return Object.entries(parsedRules).reduce((acc, [key, rule]) => {
      if (rule.rawNode.question) acc[key as DottedName] = rule;
      return acc;
    }, {} as NGCRulesNodes);
  };

  public getRule = (rule: keyof Profile): NGCRuleNode => {
    return this.model.getRule(rule);
  };

  public computeTransportFootprint = () => {
    return new TransportFootprint({
      carFootprint: this.model.evaluate("transport . voiture")
        .nodeValue as number,
      boatFootprint: this.model.evaluate("transport . ferry")
        .nodeValue as number,
      planeFootprint: this.model.evaluate("transport . avion")
        .nodeValue as number,
      twoWheelerFootprint: this.model.evaluate("transport . deux roues")
        .nodeValue as number,
      gentleMobilityFootprint: this.model.evaluate("transport . mobilité douce")
        .nodeValue as number,
      holidaysTransportFootprint: this.model.evaluate("transport . vacances")
        .nodeValue as number,
      publicTransportFootprint: this.model.evaluate(
        "transport . transports commun",
      ).nodeValue as number,
      trainFootprint: this.model.evaluate("transport . train")
        .nodeValue as number,
    });
  };
}
