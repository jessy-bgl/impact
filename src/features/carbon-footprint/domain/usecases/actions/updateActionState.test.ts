import { ActionsStubRepository } from "@carbonFootprint/data/repositories/actions.stub.repository";
import { ActionState } from "@carbonFootprint/domain/entities/action/Action";
import { ActionStub } from "@carbonFootprint/domain/entities/action/Action.stub";
import { createUpdateActionState } from "@carbonFootprint/domain/usecases/actions/updateActionState";

describe("createUpdateActionState", () => {
  let actionsRepository: ActionsStubRepository;
  let updateActionState: ReturnType<
    typeof createUpdateActionState
  >["updateActionState"];

  beforeEach(() => {
    actionsRepository = new ActionsStubRepository();
    ({ updateActionState } = createUpdateActionState(actionsRepository));
  });

  it.each([
    ["notStarted", "inProgress"],
    ["inProgress", "skipped"],
    ["skipped", "notStarted"],
  ] as [ActionState, ActionState][])(
    "transitions state from %s to %s",
    (from, to) => {
      const action = new ActionStub("some.action");
      action.state = from;
      actionsRepository.actions = [action];

      updateActionState("some.action", to);

      expect(actionsRepository.actions[0].state).toBe(to);
    },
  );

  it("does nothing when the action id does not exist", () => {
    const action = new ActionStub("some.action");
    actionsRepository.actions = [action];

    updateActionState("non-existent", "inProgress");

    expect(action.state).toBe("notStarted");
    expect(actionsRepository.actions).toHaveLength(1);
  });
});
