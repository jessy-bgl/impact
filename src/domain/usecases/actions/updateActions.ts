import { Action } from "@domain/entities/actions/Action";
import { StopShortHaulFlightsAction } from "@domain/entities/actions/transport/plane.actions";
import { ActionsRepository } from "@domain/repositories/actions.repository";
import { EmissionsRepository } from "@domain/repositories/emissions.repository";

export const createUseUpdateActions = (
  actionsRepository: ActionsRepository,
  emissionsRepository: EmissionsRepository,
) =>
  function useUpdateActions() {
    const updateActions = () => {
      const actions = initActions();
      const storedActions = actionsRepository.fetchActions();
      restoreActions(actions, storedActions);
      computeSavedFootprint(actions);
      updateState(actions);
      actionsRepository.updateActions([...actions]);
    };

    const initActions = (): Action[] => {
      const transport = emissionsRepository.fetchTransport();

      const actions: Action[] = [
        new StopShortHaulFlightsAction(transport.plane),
      ];

      return actions;
    };

    const restoreActions = (actions: Action[], storedActions: Action[]) => {
      actions.forEach((action) => {
        const existingAction = storedActions.find(
          (storedAction) => action.id === storedAction.id,
        );
        if (existingAction) {
          action.restore(existingAction);
        }
      });
    };

    const computeSavedFootprint = (actions: Action[]) =>
      actions.forEach((action) => action.computeSavedFootprint());

    const updateState = (actions: Action[]) =>
      actions.forEach((action) => action.updateState());

    return { updateActions };
  };
