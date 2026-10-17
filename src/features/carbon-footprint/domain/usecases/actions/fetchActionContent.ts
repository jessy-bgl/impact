import { ActionContentsRepository } from "@carbonFootprint/domain/repositories/actionContents.repository";

export const createFetchActionContent = (
  actionContentsRepository: ActionContentsRepository,
) => {
  const fetchActionContent = (actionId: string) =>
    actionContentsRepository.fetchActionContent(actionId);

  return { fetchActionContent };
};
