import { useContext } from "react";

import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

type TourPage = "profile" | "actions";

/** Whether the guided tour of `page` is still to be shown on its own. */
export const useIntro = (page: TourPage) => {
  const shouldShowIntro = useAppStore((state) => state.shouldShowIntro[page]);

  const { setShouldShowProfileIntro, setShouldShowActionsIntro } =
    useContext(UsecasesContext);

  const hideIntro = () =>
    page === "profile"
      ? setShouldShowProfileIntro(false)
      : setShouldShowActionsIntro(false);

  return { shouldShowIntro, hideIntro };
};
