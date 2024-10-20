import { DottedName } from "@incubateur-ademe/nosgestesclimat";
import _ from "lodash";

import {
  ademeFootprintModel,
  NGCRulesNodes,
} from "@data/ademe-footprint-model";
import { Action } from "@domain/entities/action/Action";
import { AdemeAction } from "@domain/entities/action/AdemeAction";
import { AdemeEngine } from "@domain/entities/AdemeEngine";
import { EverydayThingsFootprint } from "@domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@domain/entities/footprints/TransportFootprint";
import { Profile } from "@domain/entities/profile/Profile";
import { AdemeQuestion } from "@domain/entities/question/AdemeQuestion";
import { Question } from "@domain/entities/question/Question";

export abstract class AdemeFootprintEngine {
  public static getQuestions = (
    profile: Profile,
  ): Record<keyof Profile, Question> => {
    const ademeQuestionRules = this.getQuestionRules();
    return Object.keys(ademeQuestionRules).reduce(
      (acc, key) => {
        const ruleKey = key as keyof Profile;
        const rule = ademeQuestionRules[ruleKey];
        acc[ruleKey] = new AdemeQuestion(profile, ruleKey, rule);
        return acc;
      },
      {} as Record<keyof Profile, Question>,
    );
  };

  private static getQuestionRules = (): NGCRulesNodes => {
    const rules = AdemeEngine.getRules();
    return Object.entries(rules).reduce((acc, [key, rule]) => {
      if (rule.rawNode.question) acc[key as DottedName] = rule;
      return acc;
    }, {} as NGCRulesNodes);
  };

  public static getActions = (): Action[] => {
    // remove not applicable / completed actions
    let actionEvaluatedNodes = this.getActionNames()
      .filter((actionRuleName: DottedName) =>
        AdemeEngine.getIsApplicable(actionRuleName),
      )
      .map((actionRuleName: DottedName) => {
        const evaluation = ademeFootprintModel.evaluate(actionRuleName);
        const rule = AdemeEngine.getRule(actionRuleName);
        return {
          ...evaluation,
          ...rule,
          dottedName: actionRuleName,
        };
      });
    // TODO : filter irrelevant actions ?
    // sort actions by impact
    actionEvaluatedNodes = _.sortBy(
      actionEvaluatedNodes,
      (action) => -1 * (AdemeEngine.getNumericValue(action) ?? 1),
    );
    // filter disabled actions
    const rules = AdemeEngine.getRules();
    actionEvaluatedNodes = actionEvaluatedNodes.filter((action) => {
      const flatRule = rules[action.dottedName as DottedName] as {
        formule?: string;
      };
      return !AdemeEngine.getIsDisabled(
        flatRule,
        AdemeEngine.getNumericValue(action),
      );
    });
    return actionEvaluatedNodes.map((action) => new AdemeAction(action));
  };

  private static getActionNames = (): DottedName[] => {
    const actionsNode = AdemeEngine.getRules().actions;
    const actionNames = actionsNode.rawNode.formule.somme as DottedName[];
    return actionNames;
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

  public static computeFoodFootprint = () => {
    return new FoodFootprint({
      drinksFootprint: ademeFootprintModel.evaluate("alimentation . boisson")
        .nodeValue as number,
      mealsFootprint: ademeFootprintModel.evaluate("alimentation . repas")
        .nodeValue as number,
      wasteFootprint: ademeFootprintModel.evaluate("alimentation . déchets")
        .nodeValue as number,
    });
  };

  public static computeHousingFootprint = () => {
    return new HousingFootprint({
      homeFootprint: ademeFootprintModel.evaluate("logement . construction")
        .nodeValue as number,
      energyFootprint:
        (ademeFootprintModel.evaluate("logement . électricité")
          .nodeValue as number) +
        (ademeFootprintModel.evaluate("logement . chauffage")
          .nodeValue as number) +
        (ademeFootprintModel.evaluate("logement . climatisation")
          .nodeValue as number),
      leisureFootprint:
        (ademeFootprintModel.evaluate("logement . vacances")
          .nodeValue as number) +
        (ademeFootprintModel.evaluate("logement . piscine")
          .nodeValue as number) +
        (ademeFootprintModel.evaluate("logement . extérieur")
          .nodeValue as number),
    });
  };

  public static computeEverydayThingsFootprint = () => {
    return new EverydayThingsFootprint({
      petFootprint: ademeFootprintModel.evaluate("divers . animaux domestiques")
        .nodeValue as number,
      furnitureFootprint: ademeFootprintModel.evaluate("divers . ameublement")
        .nodeValue as number,
      otherProductsFootprint: ademeFootprintModel.evaluate(
        "divers . autres produits",
      ).nodeValue as number,
      hobbiesFootprint: ademeFootprintModel.evaluate("divers . loisirs")
        .nodeValue as number,
      clothesFootprint: ademeFootprintModel.evaluate("divers . textile")
        .nodeValue as number,
      digitalFootprint: ademeFootprintModel.evaluate("divers . numérique")
        .nodeValue as number,
      consumableProductsFootprint: ademeFootprintModel.evaluate(
        "divers . produits consommables",
      ).nodeValue as number,
      tobaccoFootprint: ademeFootprintModel.evaluate("divers . tabac")
        .nodeValue as number,
      householdApplicancesFootprint: ademeFootprintModel.evaluate(
        "divers . électroménager",
      ).nodeValue as number,
    });
  };

  public static computeSocietalServicesFootprint = () => {
    return new SocietalServicesFootprint({
      merchantServicesFootprint: ademeFootprintModel.evaluate(
        "services sociétaux . services marchands",
      ).nodeValue as number,
      publicServicesFootprint: ademeFootprintModel.evaluate(
        "services sociétaux . services publics",
      ).nodeValue as number,
    });
  };
}
