import { render, screen, userEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { ActionState } from "@carbonFootprint/domain/entities/action/Action";
import { ActionCardButtons } from "@carbonFootprint/view/screens/actions/ActionCardButtons";
import actions from "@common/translations/fr/actions.json";

import "@common/translations/i18n";

const requestedStates: ActionState[] = [];

const renderButtons = async (actionState: ActionState) =>
  await render(
    <ActionCardButtons
      actionState={actionState}
      updateState={(state) => requestedStates.push(state)}
    />,
    { wrapper: PaperProvider },
  );

describe("ActionCardButtons", () => {
  beforeEach(() => {
    requestedStates.length = 0;
  });

  it("starts an available action", async () => {
    await renderButtons("notStarted");

    await userEvent.press(screen.getByText(actions.buttons.start));

    expect(requestedStates).toEqual(["inProgress"]);
  });

  it("skips an available action", async () => {
    await renderButtons("notStarted");

    await userEvent.press(screen.getByText(actions.buttons.skip));

    expect(requestedStates).toEqual(["skipped"]);
  });

  it("takes an action in progress back to the available ones", async () => {
    await renderButtons("inProgress");

    await userEvent.press(screen.getByText(actions.buttons.remove));

    expect(requestedStates).toEqual(["notStarted"]);
  });

  it("restores a skipped action", async () => {
    await renderButtons("skipped");

    await userEvent.press(screen.getByText(actions.buttons.restore));

    expect(requestedStates).toEqual(["notStarted"]);
  });
});
