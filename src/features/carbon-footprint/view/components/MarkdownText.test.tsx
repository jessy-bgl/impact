import { render, screen } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { MarkdownText } from "@carbonFootprint/view/components/MarkdownText";

const renderMarkdown = (value: string) =>
  render(
    <PaperProvider>
      <MarkdownText value={value} />
    </PaperProvider>,
  );

describe("MarkdownText", () => {
  it("renders a markdown link as a link without its raw syntax", async () => {
    await renderMarkdown(
      "Intégrez [davantage de légumineuses](https://example.org) à vos menus.",
    );

    expect(screen.getByRole("link")).toHaveTextContent(
      /davantage de légumineuses/,
    );
    expect(screen.queryByText(/\]\(https/)).toBeNull();
  });

  it("renders a blockquote without its leading marker", async () => {
    await renderMarkdown("> Petit conseil : imprimez cette infographie.");

    expect(
      screen.getByText("Petit conseil : imprimez cette infographie."),
    ).toBeOnTheScreen();
    expect(screen.queryByText(/^>/)).toBeNull();
  });
});
