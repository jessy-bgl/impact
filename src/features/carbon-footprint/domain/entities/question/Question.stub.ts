import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";
import { Question } from "@carbonFootprint/domain/entities/question/Question";

export class QuestionStub extends Question {
  constructor(label: keyof Profile, overrides: Partial<Question> = {}) {
    super();
    this.type = "number";
    this.label = label;
    this.title = label;
    this.isApplicable = true;
    this.isInactive = false;
    this.defaultValue = "";
    this.isEngineDefaultValueUsed = true;
    Object.assign(this, overrides);
  }
}
