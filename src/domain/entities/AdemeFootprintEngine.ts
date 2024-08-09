import { DottedName } from "@incubateur-ademe/nosgestesclimat";

import {
  ademeFootprintModel,
  ConstantNode,
  NGCRuleNode,
  NGCRulesNodes,
  OperationNode,
  ReferenceNode,
} from "@data/ademe-footprint-model";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { Profile } from "@domain/entities/profile/Profile";
import { Question } from "@domain/entities/Question";

export abstract class AdemeFootprintEngine {
  public static updateSituation = (profile: Profile): void => {
    try {
      ademeFootprintModel.setSituation(profile, { strict: true });
    } catch (e) {
      console.log(e);
    }
  };

  public static getQuestions = (
    profile: Profile,
  ): Record<keyof Profile, Question> => {
    const ademeQuestionRules = AdemeFootprintEngine.getQuestionRules();
    return Object.keys(ademeQuestionRules).reduce(
      (acc, key) => {
        //TODO: gérer les select
        const ruleKey = key as keyof Profile;
        const rule = ademeQuestionRules[ruleKey];
        const rawNode = rule.rawNode;
        const isApplicable = getIsApplicable(rule, profile); // TODO
        acc[ruleKey] = {
          label: ruleKey,
          title: rawNode.question ?? "",
          description: rawNode.description,
          note: rawNode.note,
          warning: rawNode.avertissement,
          defaultValue:
            profile[ruleKey]?.toString() ?? rawNode["par défaut"]?.toString(),
          minValue: rawNode.plancher,
        };
        return acc;
      },
      {} as Record<keyof Profile, Question>,
    );
  };

  public static getRule = (rule: keyof Profile): NGCRuleNode => {
    return ademeFootprintModel.getRule(rule);
  };

  public static getRules = (rule: keyof Profile): NGCRulesNodes => {
    return ademeFootprintModel.getParsedRules();
  };

  public static getQuestionRules = (): NGCRulesNodes => {
    const parsedRules = ademeFootprintModel.getParsedRules();
    return Object.entries(parsedRules).reduce((acc, [key, rule]) => {
      if (rule.rawNode.question) acc[key as DottedName] = rule;
      return acc;
    }, {} as NGCRulesNodes);
  };

  public static computeTransportFootprint = () => {
    return new TransportFootprint({
      carFootprint: ademeFootprintModel.evaluate("transport . voiture")
        .nodeValue as number,
      boatFootprint: ademeFootprintModel.evaluate("transport . ferry")
        .nodeValue as number,
      planeFootprint: ademeFootprintModel.evaluate("transport . avion")
        .nodeValue as number,
      twoWheelerFootprint: ademeFootprintModel.evaluate(
        "transport . deux roues",
      ).nodeValue as number,
      gentleMobilityFootprint: ademeFootprintModel.evaluate(
        "transport . mobilité douce",
      ).nodeValue as number,
      holidaysTransportFootprint: ademeFootprintModel.evaluate(
        "transport . vacances",
      ).nodeValue as number,
      publicTransportFootprint: ademeFootprintModel.evaluate(
        "transport . transports commun",
      ).nodeValue as number,
      trainFootprint: ademeFootprintModel.evaluate("transport . train")
        .nodeValue as number,
    });
  };
}

function getIsApplicable(rule: NGCRuleNode, profile: Profile): boolean {
  if (rule.rawNode["applicable si"] === undefined) {
    return true;
  }

  const argsApplicableIf = rule.explanation.valeur.sourceMap?.args[
    "applicable si"
  ] as OperationNode | ReferenceNode | undefined;

  if (argsApplicableIf === undefined) {
    return true;
  }

  switch (argsApplicableIf.nodeKind) {
    case "reference": {
      const value = getReferenceNodeValue(
        rule,
        profile,
        argsApplicableIf.dottedName as keyof Profile | undefined,
      );
      if (value === undefined)
        throw new Error(`value of ${argsApplicableIf.dottedName} is undefined`);
      return true;
    }
    case "operation": {
      return true;
    }
  }
}

function getReferenceNodeValue(
  rule: NGCRuleNode,
  profile: Profile,
  referenceKey?: keyof Profile,
) {
  if (referenceKey === undefined) throw new Error("dottedName is undefined");
  const profileValue = profile[referenceKey];
  if (profileValue !== undefined) return profileValue;
  const defaultValue = rule.rawNode["par défaut"];
  return defaultValue;
}

function getOperationValue(
  rule: NGCRuleNode,
  profile: Profile,
  operation: OperationNode,
) {
  const operator = operation.operator;
  const explanation = operation.explanation;
  const [left, right] = explanation;
  if (left.nodeKind === "reference") {
    const leftValue = getReferenceNodeValue(
      rule,
      profile,
      (left as ReferenceNode).dottedName as keyof Profile,
    );
    if (leftValue === undefined) return false;
  }
  //  case "constant": {
  //   const value = getConstantNodeValue(
  //     argsApplicableIf,
  //     rule.dottedName as keyof Profile,
  //   );
  //   return true;
  // }
  return 0;
}

function getConstantNodeValue(
  constantNode: ConstantNode,
  ruleKey?: keyof Profile,
) {
  const value = constantNode.nodeValue;
  if (value === undefined || value === null)
    throw new Error(`constant value is undefined or null for rule ${ruleKey}`);
  return constantNode.nodeValue;
}
