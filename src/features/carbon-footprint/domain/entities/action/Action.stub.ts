import { Action } from "@carbonFootprint/domain/entities/action/Action";

export class ActionStub extends Action {
  constructor(id: string) {
    super({ id, label: "", description: "", category: "transport" });
  }
}
