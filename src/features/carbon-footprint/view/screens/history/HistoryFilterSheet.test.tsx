import { render, screen, userEvent } from "@testing-library/react-native";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";

import { LightTheme } from "@app/AppTheme";
import { HistoryFilter } from "@carbonFootprint/domain/entities/history/FootprintsHistoryViewModel";
import { HistoryFilterSheet } from "@carbonFootprint/view/screens/history/HistoryFilterSheet";
import emissions from "@common/translations/fr/emissions.json";

import "@common/translations/i18n";

const Providers = ({ children }: PropsWithChildren) => (
  <PaperProvider theme={LightTheme}>{children}</PaperProvider>
);

const selections: HistoryFilter[] = [];

const renderSheet = async (filter: HistoryFilter) =>
  await render(
    <HistoryFilterSheet
      filter={filter}
      onSelect={(next) => selections.push(next)}
    />,
    { wrapper: Providers },
  );

describe("HistoryFilterSheet", () => {
  beforeEach(() => {
    selections.length = 0;
  });

  it("lists the total and every category", async () => {
    await renderSheet("all");

    expect(screen.getByText(emissions.history.filterTitle)).toBeOnTheScreen();
    expect(screen.getByText(emissions.history.allFilter)).toBeOnTheScreen();

    Object.values(emissions.categories).forEach((category) =>
      expect(screen.getByText(category)).toBeOnTheScreen(),
    );
  });

  it("marks the active filter as selected", async () => {
    await renderSheet("transport");

    expect(
      screen.getByRole("button", {
        name: emissions.categories.transport,
        selected: true,
      }),
    ).toBeOnTheScreen();
    expect(
      screen.getByRole("button", {
        name: emissions.history.allFilter,
        selected: false,
      }),
    ).toBeOnTheScreen();
  });

  it("reports the picked filter", async () => {
    await renderSheet("all");

    await userEvent.press(screen.getByText(emissions.categories.housing));

    expect(selections).toEqual(["housing"]);
  });
});
