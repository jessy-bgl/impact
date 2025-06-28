import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import _ from "lodash";
import { EvaluatedNode } from "publicodes";

import { NGCRulesNodes } from "@data/ademe-footprint-model";
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
  /**
   *
   * @param profile
   * @param questionKeys allows to filter the questions to be returned (useful for performance)
   * @returns
   */
  public static getQuestions = (
    profile: Profile,
    questionKeys: (keyof Profile)[],
  ): Record<keyof Profile, Question> => {
    const ademeQuestionRules = this._getQuestionRules(questionKeys);
    return Object.keys(ademeQuestionRules).reduce(
      (acc, key) => {
        const k = key as DottedName;
        const rule = ademeQuestionRules[k];
        acc[k] = new AdemeQuestion(profile, k, rule);
        return acc;
      },
      {} as Record<keyof Profile, Question>,
    );
  };

  /**
   *
   * @param keys an optional parameter that allows to filter the questions to be returned (useful for performance)
   * @returns
   */
  private static _getQuestionRules = (
    keys?: (keyof Profile)[],
  ): NGCRulesNodes => {
    // TODO: peut être plus optimisé si on ne récupère que les règles utiles aux keys ?
    const rules = AdemeEngine.getRules();
    return Object.entries(rules).reduce((acc, [key, rule]) => {
      if (keys === undefined || keys.includes(key as DottedName)) {
        if (rule.rawNode.question) {
          acc[key as DottedName] = rule;
        }
      }
      return acc;
    }, {} as NGCRulesNodes);
  };

  public static getActions = (): Action[] => {
    // remove not applicable / completed actions
    let actionEvaluatedNodes: (NGCRuleNode & EvaluatedNode)[] =
      this.getActionNames()
        .filter((actionRuleName: DottedName) =>
          AdemeEngine.getIsApplicable(actionRuleName),
        )
        .map((actionRuleName: DottedName) => {
          const evaluation = AdemeEngine.evaluate(actionRuleName);
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
    const actionNames = (actionsNode.rawNode.formule as any)
      .somme as DottedName[];
    return actionNames;
  };

  public static computeTransportFootprint = () => {
    return new TransportFootprint({
      carFootprint: AdemeEngine.evaluate("transport . voiture")
        .nodeValue as number,
      boatFootprint: AdemeEngine.evaluate("transport . ferry")
        .nodeValue as number,
      planeFootprint: AdemeEngine.evaluate("transport . avion")
        .nodeValue as number,
      twoWheelerFootprint: AdemeEngine.evaluate("transport . deux roues")
        .nodeValue as number,
      gentleMobilityFootprint: AdemeEngine.evaluate(
        "transport . mobilité douce",
      ).nodeValue as number,
      holidaysTransportFootprint: AdemeEngine.evaluate("transport . vacances")
        .nodeValue as number,
      publicTransportFootprint: AdemeEngine.evaluate(
        "transport . transports commun",
      ).nodeValue as number,
      trainFootprint: AdemeEngine.evaluate("transport . train")
        .nodeValue as number,
    });
  };

  public static computeFoodFootprint = () => {
    return new FoodFootprint({
      drinksFootprint: AdemeEngine.evaluate("alimentation . boisson")
        .nodeValue as number,
      mealsFootprint: AdemeEngine.evaluate("alimentation . repas")
        .nodeValue as number,
      wasteFootprint: AdemeEngine.evaluate("alimentation . déchets")
        .nodeValue as number,
    });
  };

  public static computeHousingFootprint = () => {
    return new HousingFootprint({
      homeFootprint: AdemeEngine.evaluate("logement . construction")
        .nodeValue as number,
      energyFootprint:
        (AdemeEngine.evaluate("logement . électricité").nodeValue as number) +
        (AdemeEngine.evaluate("logement . chauffage").nodeValue as number) +
        (AdemeEngine.evaluate("logement . climatisation").nodeValue as number),
      leisureFootprint:
        (AdemeEngine.evaluate("logement . vacances").nodeValue as number) +
        (AdemeEngine.evaluate("logement . piscine").nodeValue as number) +
        (AdemeEngine.evaluate("logement . extérieur").nodeValue as number),
    });
  };

  public static computeEverydayThingsFootprint = () => {
    return new EverydayThingsFootprint({
      petFootprint: AdemeEngine.evaluate("divers . animaux domestiques")
        .nodeValue as number,
      furnitureFootprint: AdemeEngine.evaluate("divers . ameublement")
        .nodeValue as number,
      otherProductsFootprint: AdemeEngine.evaluate("divers . autres produits")
        .nodeValue as number,
      hobbiesFootprint: AdemeEngine.evaluate("divers . loisirs")
        .nodeValue as number,
      clothesFootprint: AdemeEngine.evaluate("divers . textile")
        .nodeValue as number,
      digitalFootprint: AdemeEngine.evaluate("divers . numérique")
        .nodeValue as number,
      consumableProductsFootprint: AdemeEngine.evaluate(
        "divers . produits consommables",
      ).nodeValue as number,
      tobaccoFootprint: AdemeEngine.evaluate("divers . tabac")
        .nodeValue as number,
      householdApplicancesFootprint: AdemeEngine.evaluate(
        "divers . électroménager",
      ).nodeValue as number,
    });
  };

  public static computeSocietalServicesFootprint = () => {
    return new SocietalServicesFootprint({
      merchantServicesFootprint: AdemeEngine.evaluate(
        "services sociétaux . services marchands",
      ).nodeValue as number,
      publicServicesFootprint: AdemeEngine.evaluate(
        "services sociétaux . services publics",
      ).nodeValue as number,
    });
  };
}
