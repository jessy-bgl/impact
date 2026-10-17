import { ActionContent } from "@carbonFootprint/domain/entities/action/ActionContent";

export interface ActionContentsRepository {
  fetchActionContent(actionId: string): ActionContent | undefined;
}
