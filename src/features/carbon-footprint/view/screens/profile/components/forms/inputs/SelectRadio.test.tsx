import { render, screen } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { QuestionStub } from "@carbonFootprint/domain/entities/question/Question.stub";
import { SelectRadio } from "@carbonFootprint/view/screens/profile/components/forms/inputs/SelectRadio";
import common from "@common/translations/fr/common.json";

import "@common/translations/i18n";

const question = new QuestionStub("logement . chauffage . principal", {
  type: "select",
  options: [
    { label: "Gaz", value: "'gaz'" },
    { label: "Bois", value: "'bois'" },
  ],
});

const renderSelectRadio = async (value: string) =>
  render(
    <PaperProvider>
      <SelectRadio question={question} value={value} onValueChange={() => {}} />
    </PaperProvider>,
  );

describe("SelectRadio", () => {
  it("tells an average is used when no option is selected", async () => {
    await renderSelectRadio("");

    expect(screen.getByText(common.unansweredAverageUsed)).toBeOnTheScreen();
  });

  it("hides the hint once an option is selected", async () => {
    await renderSelectRadio("'bois'");

    expect(screen.queryByText(common.unansweredAverageUsed)).toBeNull();
  });
});
