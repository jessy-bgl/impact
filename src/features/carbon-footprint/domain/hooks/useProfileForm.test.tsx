import { act, renderHook } from "@testing-library/react-native";
import { useController, useWatch } from "react-hook-form";

import { QuestionStub } from "@carbonFootprint/domain/entities/question/Question.stub";
import { useProfileForm } from "@carbonFootprint/domain/hooks/useProfileForm";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

const kmKey = "transport . voiture . km";
const passengersKey = "transport . voiture . voyageurs";
const mosaicKey = "alimentation . plats";
const optionKey = "alimentation . plats . végétalien . nombre";

describe("useProfileForm", () => {
  const questions = ({
    km = "12000",
    passengers = "1",
    option = "0",
  } = {}): Record<string, Question> => ({
    km: new QuestionStub(kmKey, { defaultValue: km }),
    passengers: new QuestionStub(passengersKey, { defaultValue: passengers }),
    mosaic: new QuestionStub(mosaicKey, {
      type: "multi-number",
      defaultValue: "",
      subQuestions: [new QuestionStub(optionKey, { defaultValue: option })],
    }),
  });

  // A label holds dots, which react-hook-form parses as a path: the values
  // are read one field at a time, as the screens' controllers do.
  const useProfileFormValues = (
    categoryQuestions: Record<string, Question>,
  ) => {
    const { control } = useProfileForm(categoryQuestions);
    const values = {
      km: useWatch({ control, name: kmKey }),
      passengers: useWatch({ control, name: passengersKey }),
      mosaic: useWatch({ control, name: mosaicKey }),
      option: useWatch({ control, name: optionKey }),
    };
    const { field: kmField } = useController({ control, name: kmKey });
    return { values, kmField };
  };

  const renderForm = (initial = questions()) =>
    renderHook(useProfileFormValues, { initialProps: initial });

  it("starts with the default value of every question and sub-question", async () => {
    const { result } = await renderForm();

    expect(result.current.values).toEqual({
      km: "12000",
      passengers: "1",
      mosaic: "",
      option: "0",
    });
  });

  it("sets the fields whose default changed with the questions", async () => {
    const { result, rerender } = await renderForm();

    await rerender(questions({ passengers: "2", option: "1" }));

    expect(result.current.values).toEqual({
      km: "12000",
      passengers: "2",
      mosaic: "",
      option: "1",
    });
  });

  it("follows a default that changes twice", async () => {
    const { result, rerender } = await renderForm();

    await rerender(questions({ passengers: "2" }));
    await rerender(questions({ passengers: "1" }));

    expect(result.current.values.passengers).toBe("1");
  });

  it("keeps the answer the user typed once its question carries it", async () => {
    const { result, rerender } = await renderForm();

    await act(async () => result.current.kmField.onChange("13000"));
    await rerender(questions({ km: "13000", passengers: "2" }));

    expect(result.current.values.km).toBe("13000");
    expect(result.current.values.passengers).toBe("2");
  });
});
