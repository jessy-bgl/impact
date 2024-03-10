import { Action, ActionState } from "@domain/entities/actions/Action";
import { ActionsRepository } from "@domain/repositories/actions.repository";

export const createUseUpdateActionState = (
  actionsRepository: ActionsRepository,
) =>
  function useUpdateActionState() {
    const updateActionState = (actionId: string, state: ActionState) => {
      const storedActions: Action[] = actionsRepository.fetchActions();

      const updatedActions: Action[] = storedActions.map((storedAction) =>
        storedAction.id === actionId
          ? { ...storedAction, state }
          : storedAction,
      ) as Action[];

      actionsRepository.updateActions(updatedActions);
    };

    return { updateActionState };
  };
