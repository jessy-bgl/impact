import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import _ from "lodash";
import { EvaluatedNode } from "publicodes";

import { NGCRulesNodes } from "@carbonFootprint/data/ademe-footprint-model";
import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { AdemeAction } from "@carbonFootprint/domain/entities/action/AdemeAction";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { AdemeQuestion } from "@carbonFootprint/domain/entities/question/AdemeQuestion";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

export class AdemeComputeEngine implements ComputeEngine {
  /**
   *
   * @param profile
   * @param questionLabels allows to filter the questions to be returned (useful for performance)
   * @returns
   */
  public getQuestions = (
    profile: Profile,
    questionLabels: (keyof Profile)[],
  ): Record<keyof Profile, Question> => {
    const ademeQuestionRules = this._getQuestionRules(questionLabels);
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
  private _getQuestionRules = (keys?: (keyof Profile)[]): NGCRulesNodes => {
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

  public getActions = (): Action[] => {
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

  private getActionNames = (): DottedName[] => {
    const actionsNode = AdemeEngine.getRules().actions;
    const formule = actionsNode.rawNode.formule as
      | { somme?: DottedName[] }
      | undefined;
    return formule?.somme ?? [];
  };

  public computeTransportFootprint = () => {
    return new TransportFootprint({
      carFootprint: this.evaluateRule("transport . voiture"),
      boatFootprint: this.evaluateRule("transport . ferry"),
      planeFootprint: this.evaluateRule("transport . avion"),
      twoWheelerFootprint: this.evaluateRule("transport . deux roues"),
      gentleMobilityFootprint: this.evaluateRule("transport . mobilité douce"),
      holidaysTransportFootprint: this.evaluateRule("transport . vacances"),
      publicTransportFootprint: this.evaluateRule(
        "transport . transports commun",
      ),
      trainFootprint: this.evaluateRule("transport . train"),
    });
  };

  public computeFoodFootprint = () => {
    return new FoodFootprint({
      drinksFootprint: this.evaluateRule("alimentation . boisson"),
      mealsFootprint: this.evaluateRule("alimentation . repas"),
      wasteFootprint: this.evaluateRule("alimentation . déchets"),
    });
  };

  public computeHousingFootprint = () => {
    return new HousingFootprint({
      homeFootprint: this.evaluateRule("logement . construction"),
      energyFootprint:
        this.evaluateRule("logement . électricité") +
        this.evaluateRule("logement . chauffage") +
        this.evaluateRule("logement . climatisation"),
      leisureFootprint:
        this.evaluateRule("logement . vacances") +
        this.evaluateRule("logement . piscine") +
        this.evaluateRule("logement . extérieur"),
    });
  };

  public computeEverydayThingsFootprint = () => {
    return new EverydayThingsFootprint({
      petFootprint: this.evaluateRule("divers . animaux domestiques"),
      furnitureFootprint: this.evaluateRule("divers . ameublement"),
      otherProductsFootprint: this.evaluateRule("divers . autres produits"),
      hobbiesFootprint: this.evaluateRule("divers . loisirs"),
      clothesFootprint: this.evaluateRule("divers . textile"),
      digitalFootprint: this.evaluateRule("divers . numérique"),
      consumableProductsFootprint: this.evaluateRule(
        "divers . produits consommables",
      ),
      tobaccoFootprint: this.evaluateRule("divers . tabac"),
      householdApplicancesFootprint: this.evaluateRule(
        "divers . électroménager",
      ),
    });
  };

  public computeSocietalServicesFootprint = () => {
    return new SocietalServicesFootprint({
      merchantServicesFootprint: this.evaluateRule(
        "services sociétaux . services marchands",
      ),
      publicServicesFootprint: this.evaluateRule(
        "services sociétaux . services publics",
      ),
    });
  };

  public computeFootprints = () => {
    return {
      transport: this.computeTransportFootprint(),
      food: this.computeFoodFootprint(),
      housing: this.computeHousingFootprint(),
      everydayThings: this.computeEverydayThingsFootprint(),
      societalServices: this.computeSocietalServicesFootprint(),
    };
  };

  public setProfile = (profile: Profile, keepPreviousSituation = false) => {
    return AdemeEngine.setSituation(profile, keepPreviousSituation);
  };

  private evaluateRule = (dottedName: DottedName): number => {
    return (AdemeEngine.evaluate(dottedName).nodeValue as number) ?? 0;
  };
}
