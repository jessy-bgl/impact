import { DottedName } from "@incubateur-ademe/nosgestesclimat";
import { EvaluatedNode } from "publicodes";

import { initFakeRepositories } from "@common/UsecasesContext";
import { NGCRuleNode } from "@data/ademe-footprint-model";
import { AdemeAction } from "@domain/entities/action/AdemeAction";
import { AdemeEngine } from "@domain/entities/AdemeEngine";
import { createUpdateActionState } from "@domain/usecases/actions/updateActionState";

describe("update action state", () => {
  let repositories: ReturnType<typeof initFakeRepositories>;

  beforeEach(() => {
    repositories = initFakeRepositories();
  });

  it("should update action state", () => {
    // Arrange
    const ruleKey: DottedName = "transport . voiture . réduire taille";
    const ademeRule = AdemeEngine.getRule(ruleKey);
    const ademeEvaluation = AdemeEngine.evaluate(ruleKey);
    const action = new AdemeAction({
      ...ademeRule,
      ...ademeEvaluation,
    } as NGCRuleNode & EvaluatedNode);
    action.state = "notStarted";
    repositories.actionsRepository.actions = [action];
    const updateActionState = createUpdateActionState(
      repositories.actionsRepository,
    );
    // Act
    updateActionState(action.id, "inProgress");
    // Assert
    expect(action.state).toBe("inProgress");
  });
});
