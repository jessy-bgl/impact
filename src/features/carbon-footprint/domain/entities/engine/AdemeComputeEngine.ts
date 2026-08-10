import { DottedName, NGCRuleNode } from "@incubateur-ademe/nosgestesclimat";
import { EvaluatedNode } from "publicodes";

import { NGCRulesNodes } from "@carbonFootprint/data/ademe-footprint-model";
import { Action } from "@carbonFootprint/domain/entities/action/Action";
import { AdemeAction } from "@carbonFootprint/domain/entities/action/AdemeAction";
import { ademeCategoryRules } from "@carbonFootprint/domain/entities/engine/ademeCategoryRules";
import { AdemeEngine } from "@carbonFootprint/domain/entities/engine/AdemeEngine";
import { ComputeEngine } from "@carbonFootprint/domain/entities/engine/ComputeEngine";
import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintCategory } from "@carbonFootprint/domain/entities/footprints/types";
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

  public getCategory = (questionKey: keyof Profile): FootprintCategory => {
    return AdemeEngine.getCategory(questionKey);
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
    actionEvaluatedNodes = [...actionEvaluatedNodes].sort(
      (a, b) =>
        (AdemeEngine.getNumericValue(b) ?? 1) -
        (AdemeEngine.getNumericValue(a) ?? 1),
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
      { somme?: DottedName[] } | undefined;
    return formule?.somme ?? [];
  };

  public computeTransportFootprint = () => {
    const rules = ademeCategoryRules.transport;
    return new TransportFootprint({
      carFootprint: this.sumRules(rules.car),
      twoWheelerFootprint: this.sumRules(rules.twoWheeler),
      planeFootprint: this.sumRules(rules.plane),
      publicTransportFootprint: this.sumRules(rules.publicTransport),
      holidaysTransportFootprint: this.sumRules(rules.holidaysTransport),
      gentleMobilityFootprint: this.sumRules(rules.gentleMobility),
    });
  };

  public computeFoodFootprint = () => {
    const rules = ademeCategoryRules.food;
    return new FoodFootprint({
      drinksFootprint: this.sumRules(rules.drinks),
      mealsFootprint: this.sumRules(rules.meals),
      wasteFootprint: this.sumRules(rules.waste),
    });
  };

  public computeHousingFootprint = () => {
    const rules = ademeCategoryRules.housing;
    return new HousingFootprint({
      homeFootprint: this.sumRules(rules.home),
      energyFootprint: this.sumRules(rules.energy),
      leisureFootprint: this.sumRules(rules.leisure),
    });
  };

  public computeEverydayThingsFootprint = () => {
    const rules = ademeCategoryRules.everydayThings;
    return new EverydayThingsFootprint({
      petFootprint: this.sumRules(rules.pet),
      furnitureFootprint: this.sumRules(rules.furniture),
      hobbiesFootprint: this.sumRules(rules.hobbies),
      clothesFootprint: this.sumRules(rules.clothes),
      digitalFootprint: this.sumRules(rules.digital),
      tobaccoFootprint: this.sumRules(rules.tobacco),
      householdApplicancesFootprint: this.sumRules(rules.householdAppliances),
      otherProductsFootprint: this.sumRules(rules.otherProducts),
    });
  };

  public computeSocietalServicesFootprint = () => {
    const rules = ademeCategoryRules.societalServices;
    return new SocietalServicesFootprint({
      merchantServicesFootprint: this.sumRules(rules.merchantServices),
      publicServicesFootprint: this.sumRules(rules.publicServices),
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

  private sumRules = (dottedNames: readonly DottedName[]): number => {
    return dottedNames.reduce(
      (total, dottedName) => total + this.evaluateRule(dottedName),
      0,
    );
  };

  private evaluateRule = (dottedName: DottedName): number => {
    return (AdemeEngine.evaluate(dottedName).nodeValue as number) ?? 0;
  };
}
